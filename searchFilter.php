<?php

//Database connection variables
require_once '../db_config.php';

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// The filter parameter determines if we are searching for professors or classes
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
    $sql = "SELECT *, (CASE WHEN professors LIKE '%$searchQuery%' THEN 1 ELSE 0 END) AS exactMatch FROM professors WHERE professors LIKE '%$sqlPatterns%'";
    $fieldName = 'professors';
} elseif ($filter === 'classes') {
    $sqlPatterns = implode("%' OR class_title LIKE '%", $likePatterns);
    $sql = "SELECT *, (CASE WHEN class_title LIKE '%$searchQuery%' THEN 1 ELSE 0 END) AS exactMatch FROM classes WHERE class_title LIKE '%$sqlPatterns%'";
    $fieldName = 'class_title';
} else {
    echo json_encode(['error' => 'Invalid filter']);
    $conn->close();
    exit;
}

$result = $conn->query($sql);
$matches = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $row['similarityScore'] = similar_text(strtolower($searchQuery), strtolower($row[$fieldName]));
        $matches[] = $row;
    }
}

usort($matches, function($a, $b) {
    if ($a['exactMatch'] == $b['exactMatch']) {
        return $b['similarityScore'] <=> $a['similarityScore'];
    }
    return $b['exactMatch'] <=> $a['exactMatch'];
});

header('Content-Type: application/json');
echo json_encode($matches);

$conn->close();
?>
