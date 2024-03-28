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


// Database connection
$db = new mysqli($servername, $username, $password, $dbname);

// Check if table 'emails' exists
$result = $db->query("SHOW TABLES LIKE 'emails'");
if ($result->num_rows == 0) {
    // Table doesn't exist, so create it
    $db->query("
            CREATE TABLE emails (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) NOT NULL,
                subject VARCHAR(255) NOT NULL,
                message TEXT NOT NULL
            )
        ");
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data["email"]) && isset($data["subject"]) && isset($data["message"])) {
        $email = $data["email"];
        $subject = $data["subject"];
        $message = $data["message"];

        // Store in database
        $stmt = $db->prepare("INSERT INTO emails (email, subject, message) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $email, $subject, $message);
        $stmt->execute();

        // Recipient email address
        $to = $email;

        // Additional headers
        $headers = 'From: insight@buffalo.edu' . "\r\n" .
            'Reply-To: insight@buffalo.edu' . "\r\n" .
            'X-Mailer: PHP/' . phpversion();

        // Send the email
        if (mail($to, $subject, $message, $headers)) {
            http_response_code(200);
            echo json_encode(["message" => "Email sent successfully"]);
        } else {
            http_response_code(500);
            echo json_encode(["message" => "Failed to send email"]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["message" => "Invalid request"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "Method not allowed"]);
}
