<?php
$servername = "oceanus.cse.buffalo.edu";
$username = "iallahbu";
$password = "50344145";
$dbname = "cse442_2024_spring_team_ac_db";
// Prevent XSS attacks
header('X-XSS-Protection: 1; mode=block');

// Prevent Clickjacking
header('X-Frame-Options: DENY');

// Prevent MIME type sniffing
header('X-Content-Type-Options: nosniff');

// Set the Access-Control-Allow-Origin header to allow requests from any origin
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Check if the request method is OPTIONS and stop script execution after sending preflight response
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}
