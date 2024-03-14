<?php
session_start();
include_once('../db_config.php'); // Adjust the path as needed

// Enforce HTTPS in production environments
if (!isset($_SERVER['HTTPS']) || $_SERVER['HTTPS'] !== 'on') {
    header("Location: https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);
    exit();
}

// CORS handling
if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400'); // cache for 1 day
} else {
    // For non-preflight requests without an origin (e.g., same-origin or when CORS is not in use)
    header('Access-Control-Allow-Origin: http://localhost:3000');
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Preflight request handling
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: POST, OPTIONS");

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

// Function to establish database connection
function getDbConnection()
{
    global $servername, $username, $password, $dbname;
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        http_response_code(500); // Server error
        echo json_encode(["message" => "Failed to connect to database: " . $conn->connect_error]);
        exit;
    }
    return $conn;
}

// Function to sign out a user
function signOut($email, $sessionID, $userID)
{
    $conn = getDbConnection();
    // Prepare SQL statement to prevent SQL injection
    $stmt = $conn->prepare("DELETE FROM sessions WHERE email = ? AND sessionID = ? AND userID = ?");
    $stmt->bind_param("ssi", $email, $sessionID, $userID);
    if ($stmt->execute()) {
        http_response_code(200); // OK
        echo json_encode(["message" => "Successfully signed out"]);
    } else {
        http_response_code(500); // Server error
        echo json_encode(["message" => "Failed to delete session"]);
    }

    $stmt->close();
    $conn->close();
}

// Main
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($data['email']) && isset($data['sessionID']) && isset($data['userID'])) {
        signOut($data['email'], $data['sessionID'], $data['userID']);
    } else {
        http_response_code(400); // Bad request
        echo json_encode(["message" => "Invalid request, email, sessionID, and userID required"]);
    }
}
