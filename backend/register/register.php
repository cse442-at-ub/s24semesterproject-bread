<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);
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
        echo json_encode(["message" => "Failed to connect to database: " . $conn->connect_error]);
        exit;
    }
    return $conn;
}

function sendSuccessEmail($email)
{
    global $servername, $username, $password, $dbname;
    $db = new mysqli($servername, $username, $password, $dbname);

    // Check the database connection
    if ($db->connect_error) {
        echo json_encode(["message" => "Failed to connect to database: " . $db->connect_error]);
        return; // Exit the function if database connection failed
    }

    // The subject and message for the success email
    $subject = "Sign Up Success";
    $message = "Congratulations, you have successfully registered.";

    // Store email details in database
    $stmt = $db->prepare("INSERT INTO emails (email, subject, message) VALUES (?, ?, ?)");
    if (!$stmt) {
        echo json_encode(["message" => "Prepare failed: (" . $db->errno . ") " . $db->error]);
        return; // Exit the function if statement preparation failed
    }

    $stmt->bind_param("sss", $email, $subject, $message);
    if (!$stmt->execute()) {
        echo json_encode(["message" => "Execute failed: (" . $stmt->errno . ") " . $stmt->error]);
        return; // Exit the function if execute failed
    }

    // Recipient email address
    $to = $email;

    // Additional headers
    $headers = 'From: insight@buffalo.edu' . "\r\n" .
        'Reply-To: insight@buffalo.edu' . "\r\n" .
        'X-Mailer: PHP/' . phpversion();

    // Attempt to send the email
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(["message" => "Email sent successfully"]);
    } else {
        echo json_encode(["message" => "Failed to send email"]);
    }

    // Close the prepared statement and database connection
    $stmt->close();
    $db->close();
}



function registerUser($email, $username, $password, $confirmPassword)
{
    if ($password !== $confirmPassword) {
        http_response_code(400);
        echo json_encode(["message" => "Passwords do not match"]);
        return;
    }

    $conn = getDbConnection();

    // Check if email already exists
    $emailCheckStmt = $conn->prepare("SELECT userID FROM users WHERE email = ?");
    $emailCheckStmt->bind_param("s", $email);
    $emailCheckStmt->execute();
    $emailResult = $emailCheckStmt->get_result();
    if ($emailResult->num_rows > 0) {
        http_response_code(409);
        echo json_encode(["message" => "Email already exists"]);
        $emailCheckStmt->close();
        return;
    }
    $emailCheckStmt->close();

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

    $insertStmt = $conn->prepare("INSERT INTO users (email, username, password) VALUES (?, ?, ?)");
    $insertStmt->bind_param("sss", $email, $username, $hashedPassword);

    if ($insertStmt->execute()) {
        http_response_code(201);
        echo json_encode(["message" => "User registered successfully"]);

        // Send success email
        sendSuccessEmail($email);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Failed to register user"]);
    }
    $insertStmt->close();
    $conn->close();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    if (!empty($_SERVER['CONTENT_TYPE']) && strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== false) {
        $json = file_get_contents('php://input');
        $data = json_decode($json, true);
    } else {
        $data = $_POST;
    }

    if (isset($data['action']) && $data['action'] == 'register' && isset($data['email']) && isset($data['username']) && isset($data['password']) && isset($data['confirmPassword'])) {
        registerUser($data['email'], $data['username'], $data['password'], $data['confirmPassword']);
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Invalid request, action, email, username, password, and confirmPassword required"]);
    }
    exit;
}
