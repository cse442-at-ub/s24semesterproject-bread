<?php
    // Include database configuration file
    include '../db_config.php';

    // Set up PDO instance
    $dsn = "mysql:host=$host;dbname=$db;charset=$charset";
    $opt = [
        PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES   => false,
    ];
    $pdo = new PDO($dsn, $user, $pass, $opt);

    // Get form data
    $username = $_POST['username'];
    $sessionID = $_POST['sessionID'];
    $userID = $_POST['userID'];

    // Prepare SQL statements
    $stmtUser = $pdo->prepare("SELECT * FROM users WHERE username = :username AND id = :userID");
    $stmtSession = $pdo->prepare("SELECT * FROM sessions WHERE id = :sessionID AND user_id = :userID");

    // Bind parameters and execute statements
    $stmtUser->execute(['username' => $username, 'userID' => $userID]);
    $stmtSession->execute(['sessionID' => $sessionID, 'userID' => $userID]);

    // Check if user and session are valid
    if($stmtUser->rowCount() > 0 && $stmtSession->rowCount() > 0) {
        // Prepare delete statements
        $stmtDeleteUser = $pdo->prepare("DELETE FROM users WHERE id = :userID");
        $stmtDeleteSession = $pdo->prepare("DELETE FROM sessions WHERE id = :sessionID");

        // Execute delete statements
        $stmtDeleteUser->execute(['userID' => $userID]);
        $stmtDeleteSession->execute(['sessionID' => $sessionID]);

        // Return success response
        http_response_code(200);
        echo json_encode(['status' => 'success', 'message' => 'Account deleted successfully']);
    } else {
        // Return error response
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Invalid username, userID, or sessionID']);
    }
?>
