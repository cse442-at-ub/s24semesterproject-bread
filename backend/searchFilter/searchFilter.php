<?php
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

$filter = isset($_GET['filter']) ? $_GET['filter'] : null;
$searchQuery = isset($_GET['query']) ? $_GET['query'] : '';
$searchWords = explode(' ', strtolower($searchQuery));
$typoVariations = [];

foreach ($searchWords as $word) {
    $typoVariations[] = $word;
    for ($i = 0; $i < strlen($word); $i++) {
        $variation = substr_replace($word, '_', $i, 1);
        $typoVariations[] = $variation;
    }
}

$likePatterns = array_unique($typoVariations);

if ($filter === 'professors') {
    $sqlPatterns = implode("%' OR professors LIKE '%", $likePatterns);
    // Assuming all columns are to be fetched, explicitly listing them for clarity and security
    $sql = "SELECT professors, education, department, classes, research, email, office, phone, pfppath, difficulty, helpfulness, clarity, `Feedback Quality`, accessibility, (CASE WHEN professors LIKE '%$searchQuery%' THEN 1 ELSE 0 END) AS exactMatch FROM professors WHERE professors LIKE '%$sqlPatterns%'";
} elseif ($filter === 'classes') {
    $sqlPatterns = implode("%' OR class_title LIKE '%", $likePatterns);
    // Modify this if you have a similar structure for classes and want to fetch specific details
    $sql = "SELECT *, (CASE WHEN class_title LIKE '%$searchQuery%' THEN 1 ELSE 0 END) AS exactMatch FROM classes WHERE class_title LIKE '%$sqlPatterns%'";
} else {
    echo json_encode(['error' => 'Invalid filter']);
    $conn->close();
    exit;
}

$result = $conn->query($sql);
$matches = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $row['similarityScore'] = similar_text(strtolower($searchQuery), strtolower($row[$filter === 'professors' ? 'professors' : 'class_title']));
        $matches[] = $row;
    }
}

usort($matches, function ($a, $b) {
    if ($a['exactMatch'] == $b['exactMatch']) {
        return $b['similarityScore'] <=> $a['similarityScore'];
    }
    return $b['exactMatch'] <=> $a['exactMatch'];
});

header('Content-Type: application/json');
echo json_encode($matches);

$conn->close();
