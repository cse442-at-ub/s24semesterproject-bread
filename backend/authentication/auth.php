<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('Content-Type: application/json');

require_once '../db_config.php';
$data = json_decode(file_get_contents('php://input'), true);

// Define an array of allowed origins
$allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:8000',
    'https://www-student.cse.buffalo.edu'
];

// Get the origin of the current request
$requestOrigin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

// Check if the request origin is in the allowed origins list
if (in_array($requestOrigin, $allowedOrigins)) {
    // If so, set the Access-Control-Allow-Origin header to the request origin
    header("Access-Control-Allow-Origin: $requestOrigin");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
} else {
    // Optionally handle requests from disallowed origins, such as logging or sending a specific response
    // For now, we'll simply exit to prevent further execution for disallowed origins
    exit('Origin not allowed');
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Stop script execution after sending preflight response
    exit(0);
}

// Function to establish database connection, reused from your logout script
function getDbConnection()
{
    global $servername, $username, $password, $dbname;
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        http_response_code(500); // Server error
        echo json_encode(["message" => "Failed to connect to the database: " . $conn->connect_error]);
        exit;
    }
    return $conn;
}


function authenticateUser($email, $sessionId, $userId)
{
    $conn = getDbConnection();

    if ($stmt = $conn->prepare("SELECT * FROM sessions WHERE email = ? AND sessionID = ? AND userID = ?")) {
        $stmt->bind_param("ssi", $email, $sessionId, $userId);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 1) {
            return true; // The user is authenticated successfully
        }
        $stmt->close();
    }
    $conn->close();
    return false; // Authentication failed or statement preparation failed
}

// Extracting data from the request
$sessionId = $data['sessionID'] ?? null;
$email = $data['email'] ?? null;
$userId = $data['userID'] ?? null;

// Attempt to authenticate the user with the provided credentials
if (!is_null($sessionId) && !is_null($email) && !is_null($userId)) {
    if (authenticateUser($email, $sessionId, $userId)) {
        echo json_encode(["status" => "success", "message" => "User authenticated successfully."]);
    } else {
        http_response_code(401); // Unauthorized
        echo json_encode(["status" => "error", "message" => "Authentication failed. No matching record found."]);
    }
} else {
    http_response_code(400); // Bad Request
    echo json_encode(["status" => "error", "message" => "Invalid input data provided."]);
}
