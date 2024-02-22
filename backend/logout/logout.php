<?php
// Include the database configuration file
require_once '../db_config.php';

// Function to establish database connection
function getDbConnection() {
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
function signOut($username, $sessionID, $userID) {
    $conn = getDbConnection();
    // Prepare SQL statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT * FROM sessions WHERE username = ? AND sessionID = ? AND userID = ?");
    $stmt->bind_param("ssi", $username, $sessionID, $userID);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows > 0) {
        // Session exists; proceed to delete
        $deleteStmt = $conn->prepare("DELETE FROM sessions WHERE username = ? AND sessionID = ? AND userID = ?");
        $deleteStmt->bind_param("ssi", $username, $sessionID, $userID);
        if ($deleteStmt->execute()) {
            http_response_code(200); // OK
            echo json_encode(["message" => "Successfully signed out"]);
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
    // Expecting JSON input
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (isset($data['username']) && isset($data['sessionID']) && isset($data['userID'])) {
        signOut($data['username'], $data['sessionID'], $data['userID']);
    } else {
        http_response_code(400); // Bad request
        echo json_encode(["message" => "Invalid request, username, sessionID, and userID required"]);
    }
}
?>
