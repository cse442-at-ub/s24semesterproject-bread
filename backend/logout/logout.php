<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('X-Content-Type-Options: nosniff');

require_once '../db_config.php';

$requestOrigin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

// Specify the domains allowed for CORS, including HTTPS
$allowedDomains = [
    'https://www-student.cse.buffalo.edu', // Your production frontend domain
    'http://localhost:3000', // Your development frontend domain
    // Add any other domains you expect requests from
];

// Check if the request origin is in the allowed list
if (in_array($requestOrigin, $allowedDomains)) {
    header('Access-Control-Allow-Origin: ' . $requestOrigin);
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
    header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization');
    header('Access-Control-Max-Age: 3600');
    header('Access-Control-Allow-Credentials: true');
}

// Specifically handle OPTIONS method for preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    // Note: 'Access-Control-Allow-Origin' is already set above based on the request origin
    // No need to repeat it here unless you're overriding it for a specific reason

    // Confirm preflight configuration with an OK status
    http_response_code(200);
    exit;
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
$data = json_decode(file_get_contents("php://input"), true);

file_put_contents("php://stderr", print_r($data, true));

if (isset($data['email']) && isset($data['sessionID']) && isset($data['userID'])) {
    $email = $data['email'];
    $sessionID = $data['sessionID'];
    $userID = $data['userID'];

    signOut($email, $sessionID, $userID);
} else {
    http_response_code(400); // Bad request
    echo json_encode(["message" => "Invalid request, email, sessionID, and userID required"]);
}
