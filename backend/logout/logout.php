<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('X-Content-Type-Options: nosniff');
require_once '../db_config.php';

$requestOrigin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

// Specify the domains allowed for CORS, including HTTPS
$allowedDomains = [
    'https://www-student.cse.buffalo.edu/CSE442-542/2024-Spring/cse-442ac', // Your production frontend domain
    'http://localhost:3000/CSE442-542/2024-Spring/cse-442ac/', // Your development frontend domain, assuming HTTPS is configured locally
    // Add any other domains you expect requests from, using HTTPS
];

// Check if the request origin is in the allowed list
if (in_array($requestOrigin, $allowedDomains)) {
    header('Access-Control-Allow-Origin: ' . $requestOrigin);
}

// Set other CORS headers as needed
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization');
header('Access-Control-Max-Age: 3600');
header('Access-Control-Allow-Credentials: true');

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
