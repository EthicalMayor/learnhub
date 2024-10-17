package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"net/smtp"
	"os"
	"regexp"

	_ "github.com/go-sql-driver/mysql" // MySQL driver
	"golang.org/x/crypto/bcrypt"
)

// enableCORS sets headers to allow cross-origin requests
func enableCORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3001")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

		// Handle preflight requests
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	}
}

// User represents incoming signup data
type User struct {
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	DOB       struct {
		Month int `json:"month"`
		Day   int `json:"day"`
		Year  int `json:"year"`
	} `json:"dob"`
}

// Document represents a document entry
type Document struct {
	ID      int    `json:"id"`
	Title   string `json:"title"`
	Created string `json:"created"`
}

// LoginRequest represents the login request payload
type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

var db *sql.DB

// connectDB initializes the MySQL database connection
func connectDB() {
	var err error
	db, err = sql.Open("mysql", "root:"+os.Getenv("MYSQL_PASSWORD")+"@tcp(127.0.0.1:3306)/learnhub")
	if err != nil {
		log.Fatal("Error connecting to the database:", err)
	}
	if err = db.Ping(); err != nil {
		log.Fatal("Error pinging the database:", err)
	}
	fmt.Println("Connected to the database successfully!")
}

// HashPassword hashes the password using bcrypt
func HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bytes), err
}

// ValidatePassword checks if the password meets the complexity requirements
func ValidatePassword(password string) error {
	// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
	const passwordPattern = `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$`
	match, err := regexp.MatchString(passwordPattern, password)
	if err != nil || !match {
		return fmt.Errorf("password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character")
	}
	return nil
}

// SendVerificationEmail sends a verification email to the user
func SendVerificationEmail(to string) error {
	from := "jummybusinesscentre@gmail.com" // Use your email address
	password := os.Getenv("EMAIL_PASSWORD") // Use an environment variable for your email password

	// Set up the email server
	smtpHost := "sandbox.smtp.mailtrap.io"
	smtpPort := "587" // or 2525

	// Create email message
	subject := "Email Verification"
	body := "Please verify your email by clicking the following link: http://localhost:3000/verify?email=" + to
	message := []byte("Subject: " + subject + "\r\n" + "\r\n" + body)

	// Connect to the SMTP server
	auth := smtp.PlainAuth("", from, password, smtpHost)
	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, from, []string{to}, message)
	if err != nil {
		return fmt.Errorf("failed to send verification email: %w", err)
	}

	return nil
}

// SignUpHandler handles user sign-up requests
func SignUpHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	var user User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		log.Println("Failed to decode request:", err)
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	log.Printf("Received user data: %+v\n", user)

	// Check password policy
	if err := ValidatePassword(user.Password); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Check if the email already exists
	var existingEmail string
	emailCheckQuery := "SELECT email FROM users WHERE email = ?"
	err := db.QueryRow(emailCheckQuery, user.Email).Scan(&existingEmail)
	if err != nil && err != sql.ErrNoRows {
		http.Error(w, "Error checking email", http.StatusInternalServerError)
		return
	}
	if existingEmail != "" {
		http.Error(w, "Email is already in use. Please choose another.", http.StatusConflict)
		return
	}

	hashedPassword, err := HashPassword(user.Password)
	if err != nil {
		http.Error(w, "Error hashing password", http.StatusInternalServerError)
		return
	}

	dob := fmt.Sprintf("%04d-%02d-%02d", user.DOB.Year, user.DOB.Month, user.DOB.Day)
	query := `INSERT INTO users (first_name, last_name, email, password_hash, dob, is_verified) VALUES (?, ?, ?, ?, ?, ?)`
	_, err = db.Exec(query, user.FirstName, user.LastName, user.Email, hashedPassword, dob, false) // Set is_verified to false
	if err != nil {
		http.Error(w, "Error creating user", http.StatusInternalServerError)
		return
	}

	// Send verification email
	if err := SendVerificationEmail(user.Email); err != nil {
		log.Println("Error sending verification email:", err)
		http.Error(w, "User created, but failed to send verification email", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"msg":      "User created successfully. Please verify your email.",
		"redirect": "/login",
	})
}

type LoginResponse struct {
	Message   string `json:"msg"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
}

// LoginHandler handles user login requests
func LoginHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	var loginReq LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&loginReq); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	var (
		hashedPassword string
		firstName      string
		lastName       string
	)
	query := "SELECT password_hash, first_name, last_name FROM users WHERE email = ?"
	err := db.QueryRow(query, loginReq.Email).Scan(&hashedPassword, &firstName, &lastName)
	if err != nil {
		http.Error(w, "Invalid email or password", http.StatusUnauthorized)
		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(loginReq.Password)); err != nil {
		http.Error(w, "Invalid email or password", http.StatusUnauthorized)
		return
	}

	response := LoginResponse{
		Message:   "Login successful",
		FirstName: firstName,
		LastName:  lastName,
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

// FetchDocumentsHandler handles fetching documents
func FetchDocumentsHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
		return
	}

	rows, err := db.Query("SELECT id, title, created FROM documents")
	if err != nil {
		http.Error(w, "Error fetching documents", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var documents []Document
	for rows.Next() {
		var doc Document
		if err := rows.Scan(&doc.ID, &doc.Title, &doc.Created); err != nil {
			http.Error(w, "Error scanning document", http.StatusInternalServerError)
			return
		}
		documents = append(documents, doc)
	}
	if err := rows.Err(); err != nil {
		http.Error(w, "Error processing documents", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(documents)
}

func main() {
	connectDB()
	http.HandleFunc("/api/signup", enableCORS(SignUpHandler))
	http.HandleFunc("/api/login", enableCORS(LoginHandler))
	http.HandleFunc("/api/documents", enableCORS(FetchDocumentsHandler))

	log.Println("Server is running on :8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
