<?php

session_start();

require_once 'db_config.php';

function authenticateUser($userId, $username, $sessionId) {
    // Assuming $conn is a mysqli connection object from db_config.php
    global $conn;

    // Prepare the SQL statement
    $stmt = $conn->prepare("SELECT * FROM sessions WHERE userID = ? AND username = ? AND sessionId = ?");
    $stmt->bind_param("iss", $userId, $username, $sessionId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    // If a matching record is found, the user is considered authenticated
    if ($result->num_rows === 1) {
        $sessionRecord = $result->fetch_assoc();

        // Here, you can add additional checks if necessary
        // For example, you might want to check if the session record indicates the user is still logged in

        // Update the session variable to indicate the user is authenticated
        $_SESSION['authenticated_user_id'] = $userId; 
        $_SESSION['authenticated_username'] = $username;
        // You could also update the session record if needed, for instance, to refresh a last_accessed timestamp

        return true;
    } else {
        // No matching record found, authentication fails
        return false;
    }
}

// Get the user ID, username, and session ID from POST variables
$userId = isset($_POST['userID']) ? filter_var($_POST['userID'], FILTER_SANITIZE_NUMBER_INT) : null;
$username = isset($_POST['username']) ? filter_var($_POST['username'], FILTER_SANITIZE_STRING) : null;
$sessionId = isset($_POST['sessionID']) ? filter_var($_POST['sessionID'], FILTER_SANITIZE_STRING) : null;

// Authenticate the user
if (authenticateUser($userId, $username, $sessionId)) {
    // Authentication successful
    // Proceed with the privileged operations
    echo "User authenticated successfully.";
    // Perform further actions or redirect as needed
} else {
    // Authentication failed
    echo "Authentication failed.";
    // Handle the error, such as prompting for re-login, logging the attempt, etc.
    // Redirect to the login page or show an error message
}

$conn->close();

?>
