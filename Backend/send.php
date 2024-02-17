<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

// Database connection
$db = new mysqli('oceanus.cse.buffalo.edu', 'swu65', '50411773', 'cse442_2024_spring_team_ac_db'); // Change to fit database

// Check if table 'emails' exists
$result = $db->query("SHOW TABLES LIKE 'emails'");
if($result->num_rows == 0) {
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

        // Send email
        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'swu.dlg.23.4@gmail.com'; // Change you your email
        $mail->Password = 'zevaxgnaqvjzzgyp'; // Change to your google app password
        $mail->SMTPSecure = 'ssl';
        $mail->Port = 465;
        $mail->setFrom('swu.dlg.23.4@gmail.com'); // Change you your email
        $mail->addAddress($email);
        $mail->isHTML(true);
        $mail->Subject = $subject;
        $mail->Body = $message;

        if ($mail->send()) {
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
?>
