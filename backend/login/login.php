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
    $stmt = $conn->prepare("SELECT id, password FROM users WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($row = $result->fetch_assoc()) {
        // Verify password
        if (password_verify($password, $row['password'])) {
            // Password is correct, generate session ID and save it
            $sessionID = bin2hex(random_bytes(25)); // Generate a unique session ID
            $userID = $row['id'];

            // Insert session into database
            $stmt = $conn->prepare("INSERT INTO sessions (sessionID, username, userID) VALUES (?, ?, ?)");
            $stmt->bind_param("ssi", $sessionID, $username, $userID);
            if ($stmt->execute()) {
                http_response_code(200);
                echo json_encode(["username" => $username, "sessionID" => $sessionID, "userID" => $userID]);
            } else {
                http_response_code(500);
                echo json_encode(["message" => "Failed to create session"]);
            }
        } else {
            // Password is incorrect
            http_response_code(401);
            echo json_encode(["message" => "Invalid credentials"]);
        }
    } else {
        // No user found
        http_response_code(404);
        echo json_encode(["message" => "User not found"]);
    }

    $stmt->close();
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
