<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);
//Include the database configuration file
require_once '../db_config.php';




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

function registerUser($username, $password) {
    $conn = getDbConnection();
    
    $checkStmt = $conn->prepare("SELECT userID FROM users WHERE username = ?");
    $checkStmt->bind_param("s", $username);
    $checkStmt->execute();
    $result = $checkStmt->get_result();
    if ($result->num_rows > 0) {
        http_response_code(409);
        echo json_encode(["message" => "Username already exists"]);
        $checkStmt->close();
        return;
    }
    $checkStmt->close();
    
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    
    $insertStmt = $conn->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    $insertStmt->bind_param("ss", $username, $hashedPassword);
    
    if ($insertStmt->execute()) {
        http_response_code(201);
        echo json_encode(["message" => "User registered successfully"]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Failed to register user"]);
    }
    $insertStmt->close();
    $conn->close();
}

function checkLogin($username, $password) {
    $conn = getDbConnection();
    
    $selectStmt = $conn->prepare("SELECT userID, password FROM users WHERE username = ?");
    $selectStmt->bind_param("s", $username);
    $selectStmt->execute();
    $result = $selectStmt->get_result();
    
    if ($row = $result->fetch_assoc()) {
        if (password_verify($password, $row['password'])) {
            $sessionID = bin2hex(random_bytes(25));
            $userID = $row['userID'];
        
            // Insert session into the 'sessions' table
            $insertStmt = $conn->prepare("INSERT INTO sessions (sessionID, username, userID) VALUES (?, ?, ?)");
            $insertStmt->bind_param("ssi", $sessionID, $username, $userID);
            if ($insertStmt->execute()) {
                // Session creation successful, no need to update users table here
                http_response_code(200);
                echo json_encode(["username" => $username, "sessionID" => $sessionID, "userID" => $userID]);
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
        // No user found
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
    
    if (isset($data['action']) && $data['action'] == 'register' && isset($data['username']) && isset($data['password'])) {
        registerUser($data['username'], $data['password']);
    } elseif (isset($data['action']) && $data['action'] == 'login' && isset($data['username']) && isset($data['password'])) {
        checkLogin($data['username'], $data['password']);
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Invalid request, action, username, and password required"]);
    }
    exit;
}
?>
