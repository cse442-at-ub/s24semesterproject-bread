<?php
    // Include database configuration file
    include '../db_config.php';

    // Check if the request is a POST request
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);
        if (isset($data["email"], $data["sessionId"], $data["userID"])) {
            $email = $data["email"];
            $sessionId = $data["sessionId"];
            $userID = $data["userID"];

            // Create connection
            $conn = new mysqli($servername, $db_username, $password, $dbname); // Ensure you use the correct DB credentials

            // Check connection
            if ($conn->connect_error) {
                http_response_code(500);
                echo json_encode(["message" => "Failed to connect to database: " . $conn->connect_error]);
                exit;
            }

            // Begin transaction
            $conn->begin_transaction();

            try {
                // Prepare SQL statements to check if user and session exist
                $stmtUser = $conn->prepare("SELECT * FROM users WHERE email = ? AND userID = ?");
                $stmtSession = $conn->prepare("SELECT * FROM sessions WHERE sessionId = ? AND userID = ?");

                // Bind parameters and execute statements
                $stmtUser->bind_param("si", $email, $userID);
                $stmtUser->execute();
                $userResult = $stmtUser->get_result();

                if ($userResult->num_rows > 0) {
                    $stmtSession->bind_param("si", $sessionId, $userID);
                    $stmtSession->execute();
                    $sessionResult = $stmtSession->get_result();

                    // Check if user and session are valid
                    if ($sessionResult->num_rows > 0) {
                        // Prepare delete statements
                        $stmtDeleteUser = $conn->prepare("DELETE FROM users WHERE userID = ?");
                        $stmtDeleteSession = $conn->prepare("DELETE FROM sessions WHERE sessionId = ?");

                        // Execute delete statements
                        $stmtDeleteUser->bind_param("i", $userID);
                        $stmtDeleteUser->execute();

                        $stmtDeleteSession->bind_param("s", $sessionId);
                        $stmtDeleteSession->execute();

                        // Add deletion queries for other related tables here

                        // Commit transaction
                        $conn->commit();

                        // Return success response
                        http_response_code(200);
                        echo json_encode(['status' => 'success', 'message' => 'Account and all related data deleted successfully']);
                    } else {
                        throw new Exception('Invalid sessionId');
                    }
                } else {
                    throw new Exception('Invalid email or userID');
                }
            } catch (Exception $e) {
                // Rollback transaction on error
                $conn->rollback();

                // Return error response
                http_response_code(400);
                echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
            }
        } else {
            http_response_code(400); // Bad request
            echo json_encode(["message" => "Invalid request"]);
        }
    } else {
        http_response_code(405);
        echo json_encode(["message" => "Method not allowed"]);
    }
?>
