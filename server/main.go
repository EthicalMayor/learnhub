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
	_ "github.com/go-sql-driver/mysql"
	"google.golang.org/api/option"
)

type DBConfig struct {
	Host     string
	User     string
	Password string
	DBName   string
	Port     string
}

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

	config DBConfig
}

func getEnvOrDefault(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}

func createDatabase(config DBConfig) error {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/",
		config.User,
		config.Password,
		config.Host,
		config.Port,
	)
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return err
	}
	defer db.Close()

	_, err = db.Exec("CREATE DATABASE IF NOT EXISTS " + config.DBName)
	return err
}

func dropDatabase(config DBConfig) error {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/",
		config.User,
		config.Password,
		config.Host,
		config.Port,
	)
	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return err
	}
	defer db.Close()

	_, err = db.Exec("DROP DATABASE IF EXISTS " + config.DBName)
	return err
}

func initDB(config DBConfig) (*sql.DB, error) {
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=true",
		config.User,
		config.Password,
		config.Host,
		config.Port,
		config.DBName,
	)

	db, err := sql.Open("mysql", dsn)
	if err != nil {
		return nil, fmt.Errorf("error connecting to the database: %v", err)
	}

	err = db.Ping()
	if err != nil {
		return nil, fmt.Errorf("error connecting to the database: %v", err)
	}

	db.SetMaxOpenConns(25)
	db.SetMaxIdleConns(25)
	return db, nil
}

func NewServer(dbConfig DBConfig) (*Server, error) {
	// Get Firebase credentials from the environment variable
	firebaseCredentialsJSON := os.Getenv("FIREBASE_CREDENTIALS_JSON")
	if firebaseCredentialsJSON == "" {
		return nil, fmt.Errorf("FIREBASE_CREDENTIALS_JSON environment variable is not set")
	}

	// Initialize Firebase App with JSON credentials
	opt := option.WithCredentialsJSON([]byte(firebaseCredentialsJSON))
	app, err := firebase.NewApp(context.Background(), nil, opt)
	if err != nil {
		return nil, fmt.Errorf("error initializing Firebase app: %v", err)
	}

	// Initialize Firebase Auth client
	fbAuth, err := app.Auth(context.Background())
	if err != nil {
		return nil, fmt.Errorf("error initializing Firebase Auth: %v", err)
	}

	// Initialize the database connection
	db, err := initDB(dbConfig)
	if err != nil {
		return nil, fmt.Errorf("error initializing database: %v", err)
	}

	return &Server{
		db:     db,
		fbAuth: fbAuth,
		logger: log.New(os.Stdout, "[AUTH] ", log.LstdFlags),
		config: dbConfig,
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

func enableCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3001")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next(w, r)
	}
}

func main() {

	firebaseCredentialsJSON := os.Getenv("FIREBASE_CREDENTIALS_JSON")
	if firebaseCredentialsJSON == "" {
		log.Fatalf("FIREBASE_CREDENTIALS_JSON environment variable is not set")
	}

	dbConfig := DBConfig{
		Host:     getEnvOrDefault("DB_HOST", "localhost"),
		User:     getEnvOrDefault("DB_USER", "root"),
		Password: getEnvOrDefault("DB_PASSWORD", "mdmdndshdiwr82482h2kdnIop[0.,;[sj"),
		DBName:   getEnvOrDefault("DB_NAME", "learnhub"),
		Port:     getEnvOrDefault("DB_PORT", "3306"),
	}

	// Initialize the server with the database configuration
	server, err := NewServer(dbConfig)
	if err != nil {
		log.Fatalf("Error initializing server: %v", err)
	}

	// Set up the HTTP routes
	http.HandleFunc("/signup", enableCORS(server.SignupHandler))

	// Start the HTTP server
	log.Printf("Server starting on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
