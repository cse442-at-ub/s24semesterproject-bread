<?php

// Assuming you're testing this locally or in a controlled environment
// This PHP script simulates a client sending JSON data to your authentication script

// URL of your authentication script
$url = 'http://localhost/backend/authentication/auth.php'; // Adjust this to the actual path

// User data to send in JSON format
$data = [
    'userID' => '76', // Sample user ID
    'email' => 'iallahbu@buffalo.edu', // Sample email address
    'sessionID' => '2f775edf702cf45f68625092235f78a839bfbb069dcb037791' // Sample session ID
];

// Use cURL to simulate a POST request with JSON data
$curl = curl_init($url);
curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_POSTFIELDS, json_encode($data));
curl_setopt($curl, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);

$response = curl_exec($curl);
$httpStatus = curl_getinfo($curl, CURLINFO_HTTP_CODE);
curl_close($curl);

// Display the result of the authentication request
if ($httpStatus === 200) {
    // Successfully contacted the authentication script
    $responseData = json_decode($response, true); // Decode JSON response
    if ($responseData['status'] === 'success') {
        echo "Authentication successful: " . htmlspecialchars($responseData['message']);
    } else {
        echo "Authentication failed: " . htmlspecialchars($responseData['message']);
    }
} else {
    // Problem contacting the authentication script
    echo "Error contacting authentication script. HTTP status: $httpStatus";
}
