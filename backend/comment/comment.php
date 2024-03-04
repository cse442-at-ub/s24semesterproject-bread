<?php
    // Include database configuration file
    include '../db_config.php';

    // Function to handle the insertion of the comment into the database
    function insertCommentIntoDatabase($comment) {
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
        if($stmt->execute()) {
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
?>
