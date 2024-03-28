<?php
// Include database configuration file
include '../db_config.php';

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

// Function to handle the insertion of the comment into the database
function insertCommentIntoDatabase($comment)
{
    global $servername, $username, $password, $dbname;

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        http_response_code(500);
        echo json_encode(["message" => "Failed to connect to database: " . $conn->connect_error]);
        exit;
    }

    // Check if the 'comments' table exists
    $result = $conn->query("SHOW TABLES LIKE 'comments'");
    if ($result->num_rows == 0) {
        // Table doesn't exist, so create it
        $conn->query("
                CREATE TABLE comments (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    comment TEXT NOT NULL,
                    likes INT DEFAULT 0,
                    dislikes INT DEFAULT 0
                )
            ");
    }

    // Prepare SQL and bind parameters
    $stmt = $conn->prepare("INSERT INTO comments (comment, likes, dislikes) VALUES (?, 0, 0)");
    $stmt->bind_param("s", $comment);

    // Execute the query
    if ($stmt->execute()) {
        // Successfully inserted the comment
        http_response_code(200);
        echo json_encode(["message" => "Data inserted successfully"]);
    } else {
        // Error occurred
        http_response_code(500);
        echo json_encode(["message" => "Failed to insert data: " . $stmt->error]);
    }

    // Close statement and connection
    $stmt->close();
    $conn->close();
}

// Check if the request is a POST request and contains JSON
if ($_SERVER['REQUEST_METHOD'] == 'POST' && !empty($_SERVER['CONTENT_TYPE']) && strpos($_SERVER['CONTENT_TYPE'], 'application/json') !== false) {
    // Get the raw POST data
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if (isset($data['comment'])) {
        insertCommentIntoDatabase($data['comment']);
    } else {
        http_response_code(400); // Bad request
        echo json_encode(["message" => "Invalid request"]);
    }
    exit;
}
