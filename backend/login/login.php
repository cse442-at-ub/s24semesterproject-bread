<?php
header('Content-Type: application/json');

ini_set('display_errors', 1);
error_reporting(E_ALL);
header('X-Content-Type-Options: nosniff');
require_once '../db_config.php';

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


function getDbConnection()
{
    global $servername, $username, $password, $dbname;
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        http_response_code(500);
        echo json_encode(["message" => "Failed to connect to the database: " . $conn->connect_error]);
        exit;
    }
    return $conn;
}

function checkLogin($email, $password)
{
    $conn = getDbConnection();

    $selectStmt = $conn->prepare("SELECT userID, password FROM users WHERE email = ?");
    $selectStmt->bind_param("s", $email);
    $selectStmt->execute();
    $result = $selectStmt->get_result();

    if ($row = $result->fetch_assoc()) {
        if (password_verify($password, $row['password'])) {
            $sessionID = bin2hex(random_bytes(25));
            $userID = $row['userID'];

            // Insert session into the 'sessions' table
            $insertStmt = $conn->prepare("INSERT INTO sessions (sessionID, email, userID) VALUES (?, ?, ?)");
            $insertStmt->bind_param("ssi", $sessionID, $email, $userID);
            if ($insertStmt->execute()) {
                // Session creation successful
                http_response_code(200);
                echo json_encode(["email" => $email, "sessionID" => $sessionID, "userID" => $userID]);
            } else {
                // Failed to create session
                http_response_code(500);
                echo json_encode(["message" => "Failed to create session"]);
            }
            $insertStmt->close();
        } else {
            // Password is incorrect
            http_response_code(401);
            echo json_encode(["message" => "Invalid credentials"]);
        }
        $selectStmt->close();
    } else {
        // No user found with the provided email
        http_response_code(404);
        echo json_encode(["message" => "User not found"]);
    }
    $conn->close();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!empty($_SERVER['CONTENT_TYPE']) && strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== false) {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
    } else {
        $data = $_POST;
    }

    if (isset($data['action']) && $data['action'] == 'login' && isset($data['email']) && isset($data['password'])) {
        checkLogin($data['email'], $data['password']);
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Invalid request, action, email, and password required"]);
    }

    exit;
}
