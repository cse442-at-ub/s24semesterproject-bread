<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
header('X-Content-Type-Options: nosniff');
require_once '../db_config.php';

// Function to establish a database connection
function getDbConnection() {
    global $servername, $username, $password, $dbname;
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        http_response_code(500);
        echo json_encode(["message" => "Failed to connect to the database: " . $conn->connect_error]);
        exit;
    }
    return $conn;
}

// Function to create the 'sessions' table if it does not exist
function createSessionsTable($conn) {
    $createTableQuery = "
        CREATE TABLE IF NOT EXISTS sessions (
            sessionID VARCHAR(255) PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            userID INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ";

    if ($conn->query($createTableQuery) === TRUE) {
        echo "Table 'sessions' created successfully.";
    } else {
        echo "Error creating table 'sessions': " . $conn->error;
        exit;
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $conn = getDbConnection();

    header('Content-Type: application/json');

    $identifier = isset($_POST['identifier']) ? $_POST['identifier'] : '';
    $password = isset($_POST['password']) ? $_POST['password'] : '';
    $action = isset($_POST['action']) ? $_POST['action'] : '';

    if ($action == 'login' && !empty($identifier) && !empty($password)) {
        // Check if the 'sessions' table exists, and create it if not
        createSessionsTable($conn);

        // Determine if the identifier is an email or username
        $field = filter_var($identifier, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        // Prepare the select statement to check both username and email
        $selectStmt = $conn->prepare("SELECT userID, username, email, password FROM users WHERE $field = ?");
        $selectStmt->bind_param("s", $identifier);
        $selectStmt->execute();
        $selectStmt->store_result();
        $numRows = $selectStmt->num_rows;

        if ($numRows > 0) {
            $selectStmt->bind_result($userID, $username, $email, $hashedPassword);
            $selectStmt->fetch();

            if (password_verify($password, $hashedPassword)) {
                // Check for an existing session and handle it if needed

                $sessionID = bin2hex(random_bytes(25));

                // Insert session into the 'sessions' table
                $insertStmt = $conn->prepare("INSERT INTO sessions (sessionID, username, email, userID) VALUES (?, ?, ?, ?)");
                $insertStmt->bind_param("sssi", $sessionID, $username, $email, $userID);
                if ($insertStmt->execute()) {
                    // Session creation successful
                    http_response_code(200);
                    echo json_encode(["username" => $username, "email" => $email, "sessionID" => $sessionID, "userID" => $userID]);
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
        } else {
            // Username or email not found
            http_response_code(404);
            echo json_encode(["message" => "User not found"]);
        }

        $selectStmt->close();
        $conn->close();
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Invalid request, action, identifier, and password required"]);
    }

    exit;
}
?>
