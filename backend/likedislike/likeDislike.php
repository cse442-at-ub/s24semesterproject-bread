<?php
    // Include database configuration file
    include '../db_config.php';

    // Function to handle the liking or disliking of a comment
    function likeDislikeComment($commentId, $likeOrDislike, $action) {
        global $servername, $username, $password, $dbname;

        // Create connection
        $conn = new mysqli($servername, $username, $password, $dbname);

        // Check connection
        if ($conn->connect_error) {
            http_response_code(500);
            echo json_encode(["message" => "Failed to connect to database: " . $conn->connect_error]);
            exit;
        }

        // Prepare SQL and bind parameters
        if ($likeOrDislike == "like") {
            if ($action == "add") {
                $stmt = $conn->prepare("UPDATE comments SET likes = likes + 1 WHERE id = ?");
            } else if ($action == "remove") {
                $stmt = $conn->prepare("SELECT likes FROM comments WHERE id = ?");
                $stmt->bind_param("i", $commentId);
                $stmt->execute();
                $result = $stmt->get_result();
                $row = $result->fetch_assoc();
                if ($row['likes'] <= 0) {
                    http_response_code(400);
                    echo json_encode(["message" => "Request failed: Data cannot be removed as it will cause a negative number"]);
                    exit;
                }
                $stmt = $conn->prepare("UPDATE comments SET likes = likes - 1 WHERE id = ?");
            }
        } else if ($likeOrDislike == "dislike") {
            if ($action == "add") {
                $stmt = $conn->prepare("UPDATE comments SET dislikes = dislikes + 1 WHERE id = ?");
            } else if ($action == "remove") {
                $stmt = $conn->prepare("SELECT dislikes FROM comments WHERE id = ?");
                $stmt->bind_param("i", $commentId);
                $stmt->execute();
                $result = $stmt->get_result();
                $row = $result->fetch_assoc();
                if ($row['dislikes'] <= 0) {
                    http_response_code(400);
                    echo json_encode(["message" => "Request failed: Data cannot be removed as it will cause a negative number"]);
                    exit;
                }
                $stmt = $conn->prepare("UPDATE comments SET dislikes = dislikes - 1 WHERE id = ?");
            }
        }

        $stmt->bind_param("i", $commentId);

        // Execute the query
        if($stmt->execute()) {
            // Successfully liked or disliked the comment
            http_response_code(200);
            echo json_encode(["message" => "Data updated successfully"]);
        } else {
            // Error occurred
            http_response_code(500);
            echo json_encode(["message" => "Failed to update data: " . $stmt->error]);
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

        if (isset($data['commentId']) && isset($data['likeOrDislike']) && isset($data['action'])) {
            likeDislikeComment($data['commentId'], $data['likeOrDislike'], $data['action']);
        } else {
            http_response_code(400); // Bad request
            echo json_encode(["message" => "Invalid request"]);
        }
        exit;
    }
?>
