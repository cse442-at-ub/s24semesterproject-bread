<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
require_once 'db_config.php'; // Adjust path as needed

// Function to establish database connection, reused from your logout script
function getDbConnection()
{
    global $conn; // Assuming $conn is defined in your db_config.php
    if ($conn->connect_error) {
        http_response_code(500); // Server error
        echo json_encode(["message" => "Failed to connect to database: " . $conn->connect_error]);
        exit;
    }
    return $conn;
}

// Function to authenticate a user
function authenticateUser($sessionId, $email, $userId)
{
    $conn = getDbConnection(); // Use the separate function to get DB connection

    // Ensure the statement is prepared to avoid SQL injection
    if ($stmt = $conn->prepare("SELECT * FROM sessions WHERE sessionId = ? AND email = ? AND userID = ?")) {
        $stmt->bind_param("ssi", $sessionId, $email, $userId);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 1) {
            return true; // The user is authenticated successfully
        } else {
            return false; // Authentication failed: No such session
        }
    } else {
        return false; // Statement preparation failed
    }
}

$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, TRUE);

$sessionId = $input['sessionID'] ?? null;
$email = $input['email'] ?? null;
$userId = $input['userID'] ?? null;

// Attempt to authenticate the user with the provided credentials
if ($sessionId !== null && $email !== null && $userId !== null) {
    if (authenticateUser($sessionId, $email, $userId)) {
        echo json_encode(["status" => "success", "message" => "User authenticated successfully."]);
    } else {
        http_response_code(401); // Unauthorized
        echo json_encode(["status" => "error", "message" => "Authentication failed. No matching record found."]);
    }
} else {
    http_response_code(400); // Bad Request
    echo json_encode(["status" => "error", "message" => "Invalid input data provided."]);
}

// No need to explicitly close the connection; it will close automatically when the script ends
