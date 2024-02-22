<?php
    // Include database configuration file
    include '../db_config.php';

    // Check if the request is a POST request
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_POST["username"]) && isset($_POST["password"])) {
            $username = $_POST["username"];
            $password = $_POST["password"];

            // Create connection
            $conn = new mysqli($servername, $username, $password, $dbname);

            // Check connection
            if ($conn->connect_error) {
                http_response_code(500);
                echo json_encode(["message" => "Failed to connect to database: " . $conn->connect_error]);
                exit;
            }

            // Prepare SQL statements
            $stmtUser = $conn->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
            $stmtSession = $conn->prepare("SELECT * FROM sessions WHERE id = ? AND user_id = ?");

            // Bind parameters and execute statements
            $stmtUser->bind_param("ss", $username, $password);
            $stmtUser->execute();
            $userResult = $stmtUser->get_result();

            if ($userResult->num_rows > 0) {
                $user = $userResult->fetch_assoc();
                $userID = $user['id'];
                $sessionID = $user['sessionID'];

                $stmtSession->bind_param("si", $sessionID, $userID);
                $stmtSession->execute();

                // Check if user and session are valid
                if($stmtSession->rowCount() > 0) {
                    // Prepare delete statements
                    $stmtDeleteUser = $conn->prepare("DELETE FROM users WHERE id = ?");
                    $stmtDeleteSession = $conn->prepare("DELETE FROM sessions WHERE id = ?");

                    // Execute delete statements
                    $stmtDeleteUser->bind_param("i", $userID);
                    $stmtDeleteUser->execute();

                    $stmtDeleteSession->bind_param("s", $sessionID);
                    $stmtDeleteSession->execute();

                    // Return success response
                    http_response_code(200);
                    echo json_encode(['status' => 'success', 'message' => 'Account deleted successfully']);
                } else {
                    // Return error response
                    http_response_code(400);
                    echo json_encode(['status' => 'error', 'message' => 'Invalid sessionID']);
                }
            } else {
                // Return error response
                http_response_code(400);
                echo json_encode(['status' => 'error', 'message' => 'Invalid username or password']);
            }
        } else {
            http_response_code(400); // Bad request
            echo json_encode(["message" => "Invalid request"]);
        }
        exit;
    } else {
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
    }
?>
