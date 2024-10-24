package main

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/auth"
	"github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"google.golang.org/api/option"
)

type User struct {
	ID            string    `json:"id"`
	Email         string    `json:"email"`
	Name          string    `json:"name"`
	Provider      string    `json:"provider"`
	CreatedAt     time.Time `json:"created_at"`
	LastLoginAt   time.Time `json:"last_login_at"`
	EmailVerified bool      `json:"email_verified"`
}

type SignupRequest struct {
	Email    string `json:"email"`
	Name     string `json:"name"`
	Provider string `json:"provider"`
}

type Server struct {
	db     *sql.DB
	fbAuth *auth.Client
	logger *log.Logger
}

func NewServer() (*Server, error) {
	if err := godotenv.Load(); err != nil {
		return nil, err
	}

	cfg := mysql.Config{
		User:                 os.Getenv("DB_USER"),
		Passwd:               os.Getenv("DB_PASS"),
		Net:                  "tcp",
		Addr:                 os.Getenv("DB_HOST"),
		DBName:               os.Getenv("DB_NAME"),
		AllowNativePasswords: true,
		ParseTime:            true,
	}

	db, err := sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		return nil, err
	}

	firebaseCredentialsPath := os.Getenv("FIREBASE_CREDENTIALS_PATH")

	opt := option.WithCredentialsFile(firebaseCredentialsPath)
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		return nil, err
	}

	fbAuth, err := app.Auth(context.Background())
	if err != nil {
		return nil, err
	}

	return &Server{
		db:     db,
		fbAuth: fbAuth,
		logger: log.New(os.Stdout, "[AUTH] ", log.LstdFlags),
	}, nil
}

func (s *Server) SignupHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req SignupRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	if err := validateSignupRequest(req); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	idToken := r.Header.Get("Authorization")
	if idToken == "" {
		http.Error(w, "No authorization token provided", http.StatusUnauthorized)
		return
	}

	token, err := s.fbAuth.VerifyIDToken(r.Context(), idToken)
	if err != nil {
		http.Error(w, "Invalid token", http.StatusUnauthorized)
		return
	}

	tx, err := s.db.BeginTx(r.Context(), nil)
	if err != nil {
		s.logger.Printf("Error starting transaction: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	defer tx.Rollback()

	var exists bool
	err = tx.QueryRowContext(r.Context(),
		"SELECT EXISTS(SELECT 1 FROM users WHERE email = ?)",
		req.Email,
	).Scan(&exists)
	if err != nil {
		s.logger.Printf("Error checking existing user: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	if exists {
		http.Error(w, "User already exists", http.StatusConflict)
		return
	}

	user := User{
		ID:            token.UID,
		Email:         req.Email,
		Name:          req.Name,
		Provider:      req.Provider,
		CreatedAt:     time.Now(),
		LastLoginAt:   time.Now(),
		EmailVerified: token.Claims["email_verified"].(bool),
	}

	_, err = tx.ExecContext(r.Context(), `
		INSERT INTO users (id, email, name, provider, created_at, last_login_at, email_verified)
		VALUES (?, ?, ?, ?, ?, ?, ?)`,
		user.ID, user.Email, user.Name, user.Provider,
		user.CreatedAt, user.LastLoginAt, user.EmailVerified,
	)
	if err != nil {
		s.logger.Printf("Error inserting user: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	if err := tx.Commit(); err != nil {
		s.logger.Printf("Error committing transaction: %v", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

func validateSignupRequest(req SignupRequest) error {
	if req.Email == "" {
		return fmt.Errorf("email is required")
	}
	if req.Name == "" {
		return fmt.Errorf("name is required")
	}
	if req.Provider == "" {
		return fmt.Errorf("provider is required")
	}
	return nil
}

func main() {
	server, err := NewServer()
	if err != nil {
		log.Fatalf("Error initializing server: %v", err)
	}

	http.HandleFunc("/signup", server.SignupHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
