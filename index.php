<?php
// Function to handle the insertion of the message into the database
function insertMessageIntoDatabase($message) {
    // Database credentials
    $servername = "oceanus.cse.buffalo.edu";
    $username = "iallahbu";
    $password = "50344145";
    $dbname = "iallahbu_db";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        http_response_code(500);
        echo json_encode(["message" => "Failed to connect to database: " . $conn->connect_error]);
        exit;
    }

    // Check if table 'messages' exists, not 'emails'
    $result = $conn->query("SHOW TABLES LIKE 'messages'");
    if ($result->num_rows == 0) {
        // Table doesn't exist, so create it
        $conn->query("
            CREATE TABLE messages (
                id INT AUTO_INCREMENT PRIMARY KEY,
                message TEXT NOT NULL
            )
        ");
    }

    // Prepare SQL and bind parameters
    $stmt = $conn->prepare("INSERT INTO messages (message) VALUES (?)");
    $stmt->bind_param("s", $message);
    
    // Execute the query
    if($stmt->execute()) {
        // Successfully inserted the message
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
    
    if (isset($data['message'])) {
        insertMessageIntoDatabase($data['message']);
    } else {
        http_response_code(400); // Bad request
        echo json_encode(["message" => "Invalid request"]);
    }
    exit;
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Send Message</title>
    <script>
        function sendMessage() {
            var message = document.getElementById('message').value;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "index.php", true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    // Parse JSON response
                    var response = JSON.parse(xhr.responseText);
                    alert(response.message);
                }
            };
            xhr.send(JSON.stringify({message: message}));
        }
    </script>
</head>
<body>
    <form onsubmit="sendMessage(); return false;">
        <label for="message">Message:</label><br>
        <input type="text" id="message" name="message" required><br>
        <input type="submit" value="Send Message">
    </form>
</body>
</html>
