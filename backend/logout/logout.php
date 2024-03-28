<?php
// Include the database configuration file
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
    $stmt = $conn->prepare("SELECT * FROM sessions WHERE email = ? AND sessionID = ? AND userID = ?");
    $stmt->bind_param("ssi", $email, $sessionID, $userID);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Session exists; proceed to delete
        $deleteStmt = $conn->prepare("DELETE FROM sessions WHERE email = ? AND sessionID = ? AND userID = ?");
        $deleteStmt->bind_param("ssi", $email, $sessionID, $userID);
        if ($deleteStmt->execute()) {
            http_response_code(200); // OK
            // Echo success message with email, sessionID, and userID
            echo json_encode([
                "message" => "Successfully signed out",
                "email" => $email,
                "sessionID" => $sessionID,
                "userID" => $userID
            ]);
        } else {
            http_response_code(500); // Server error
            echo json_encode(["message" => "Failed to delete session"]);
        }
    } else {
        // Session not found
        http_response_code(404); // Not found
        echo json_encode(["message" => "Session not found"]);
    }

    $stmt->close();
    $conn->close();
}

// Check if the request is POST and handle JSON input
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (isset($data['email']) && isset($data['sessionID']) && isset($data['userID'])) {
        $email = $data['email'];
        $sessionID = $data['sessionID'];
        $userID = $data['userID'];

        signOut($email, $sessionID, $userID);
    } else {
        http_response_code(400); // Bad request
        echo json_encode(["message" => "Invalid request, email, sessionID, and userID required"]);
    }
}
