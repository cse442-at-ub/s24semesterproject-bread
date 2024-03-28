<?php

//Database connection variables

require_once '../db_config.php';

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

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// Assume $conn is your database connection from earlier in your PHP script



// Your database query here to fetch search results based on $query
// This example is a placeholder. You'll replace it with your actual database query code
$searchResults = []; // Assume this is filled with results from your database based on $query

// The rest of your PHP script goes here
$searchQuery = isset($_GET['query']) ? $_GET['query'] : '';

// Normalize and split the search query into words
$searchWords = explode(' ', strtolower($searchQuery));
$typoVariations = [];

// Generate simple typo variations for each word (very basic example)
foreach ($searchWords as $word) {
    // Add the original word
    $typoVariations[] = $word;

    // Example: generate variations by substituting each character with a placeholder '*'
    for ($i = 0; $i < strlen($word); $i++) {
        $variation = substr_replace($word, '_', $i, 1);
        $typoVariations[] = $variation;
    }
}

// Convert variations into a LIKE pattern
$likePatterns = array_unique($typoVariations); // Remove duplicates
$sqlPatterns = implode("%' OR class_title LIKE '%", $likePatterns);

// Updated SQL to search using LIKE with typo variations
$sql = "SELECT *,
        (CASE
            WHEN class_title LIKE '%$searchQuery%' THEN 1
            ELSE 0
        END) AS exactMatch
        FROM classes
        WHERE class_title LIKE '%$sqlPatterns%'";

$result = $conn->query($sql);

$matches = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        // Calculate a basic similarity score (could be refined)
        $row['similarityScore'] = similar_text(strtolower($searchQuery), strtolower($row['class_title']));
        $matches[] = $row;
    }
}

// Sort the results by exactMatch flag and similarityScore
usort($matches, function ($a, $b) {
    if ($a['exactMatch'] == $b['exactMatch']) {
        return $b['similarityScore'] <=> $a['similarityScore'];
    }
    return $b['exactMatch'] <=> $a['exactMatch'];
});

header('Content-Type: application/json');
echo json_encode($matches);


$conn->close();
