<?php
// Database credentials
$servername = "oceanus.cse.buffalo.edu";
$username = "iallahbu";
$password = "50344145";
$dbname = "cse442_2024_spring_team_ac_db";

// Function to establish database connection
function getDbConnection() {
    global $servername, $username, $password, $dbname;
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        http_response_code(500);
        echo json_encode(["message" => "Failed to connect to database: " . $conn->connect_error]);
        exit;
    }
    return $conn;
}

// Function to check login credentials
function checkLogin($username, $password) {
    $conn = getDbConnection();
    // Prepare SQL statement to prevent SQL injection
    $selectStmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
    $selectStmt->bind_param("s", $username);
    $selectStmt->execute();
    $result = $selectStmt->get_result();
    
    if ($row = $result->fetch_assoc()) {
        // Verify password
        if (password_verify($password, $row['password'])) {
            // Password is correct, generate session ID
            $sessionID = bin2hex(random_bytes(25)); // Generate a unique session ID
            $userID = $row['id'];
        
            // Insert session into the 'sessions' table
            $insertStmt = $conn->prepare("INSERT INTO sessions (sessionID, username, userID) VALUES (?, ?, ?)");
            $insertStmt->bind_param("ssi", $sessionID, $username, $userID);
            if ($insertStmt->execute()) {
                // Update the 'users' table with the new session ID for the authenticated user
                $updateStmt = $conn->prepare("UPDATE users SET sessionID = ? WHERE id = ?");
                $updateStmt->bind_param("si", $sessionID, $userID);
                if ($updateStmt->execute()) {
                    // Success: both session saved and users table updated
                    http_response_code(200);
                    echo json_encode(["username" => $username, "sessionID" => $sessionID, "userID" => $userID]);
                } else {
                    // Handle error if updating users table fails
                    http_response_code(500);
                    echo json_encode(["message" => "Failed to update user session"]);
                }
                $updateStmt->close();
            } else {
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
        // No user found
        http_response_code(404);
        echo json_encode(["message" => "User not found"]);
    }
    $conn->close();
}


// Check if the request is POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Check if content type is application/json for JSON payload
    if (!empty($_SERVER['CONTENT_TYPE']) && strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== false) {
        // Handle JSON payload
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
    } else {
        // Handle form data
        $data = $_POST;
    }
    
    if (isset($data['username']) && isset($data['password'])) {
        checkLogin($data['username'], $data['password']);
    } else {
        http_response_code(400); // Bad request
        echo json_encode(["message" => "Invalid request, username and password required"]);
    }
    exit;
}
?>
