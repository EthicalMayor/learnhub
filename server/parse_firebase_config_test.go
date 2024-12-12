package main

import (
	"encoding/json"
	"fmt"
	"log"
	"os"
)

func debugMain() {
	// Get the user's home directory
	homeDir, err := os.UserHomeDir()
	if err != nil {
		log.Fatalf("Failed to get home directory: %v", err)
	}

	// Build the full path to the JSON file
	filePath := homeDir + "/learnhub/server/firebase_credentials.json"

	// Read the JSON file
	data, err := os.ReadFile(filePath)
	if err != nil {
		log.Fatalf("Failed to read file: %v", err)
	}

	// Parse the JSON file
	var config map[string]interface{}
	if err := json.Unmarshal(data, &config); err != nil {
		log.Fatalf("Failed to parse JSON: %v", err)
	}

	// Print success message
	fmt.Println("Config parsed successfully!")
}
