<?php
require_once '../db_config.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0); // Stop script execution after sending preflight response
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
$department = $_GET['department'] ?? '';
$professor_type = $_GET['professor_type'] ?? '';
$total_average = $_GET['total_average'] ?? '';
$total_average_operator = $_GET['total_average_operator'] ?? '='; // can be '=', '>', '<', '>=', '<='

if (!in_array($total_average_operator, ['=', '>', '<', '>=', '<='], true)) {
    echo json_encode(['error' => 'Invalid total average operator']);
    $conn->close();
    exit;
}

// Constructing the SQL based on filters
// Constructing the SQL based on filters
if ($filter === 'professors') {
    $field = $filter;
    $sqlPatterns = implode("%' OR professors LIKE '%", $likePatterns);
    $sql = "SELECT * FROM professors WHERE ($field LIKE '%$sqlPatterns%')";

    // Apply exact match filters if provided
    if (!empty($department)) {
        $sql .= " AND department = '$department'";
    }
    if (!empty($professor_type)) {
        $sql .= " AND professor_type = '$professor_type'";
    }
    if (!empty($total_average)) {
        $sql .= " AND total_average $total_average_operator $total_average";
    }
} elseif ($filter === 'classes') {
    $field = $filter;
    $sqlPatterns = implode("%' OR classes LIKE '%", $likePatterns);
    $sql = "SELECT * FROM professors WHERE ($field LIKE '%$sqlPatterns%')";

    // Apply exact match filters if provided
    if (!empty($department)) {
        $sql .= " AND department = '$department'";
    }
    if (!empty($professor_type)) {
        $sql .= " AND professor_type = '$professor_type'";
    }
    if (!empty($total_average)) {
        $sql .= " AND total_average $total_average_operator $total_average";
    }
} else {
    echo json_encode(['error' => 'Invalid filter']);
    $conn->close();
    exit;
}

$result = $conn->query($sql);
$matches = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $row['similarityScore'] = similar_text(strtolower($searchQuery), strtolower($row['professors'] ?? ''));
        $matches[] = $row;
    }

    usort($matches, function ($a, $b) {
        $aExactMatch = $a['exactMatch'] ?? 0; // Default to 0 if not set
        $bExactMatch = $b['exactMatch'] ?? 0;
        if ($aExactMatch == $bExactMatch) {
            return $b['similarityScore'] <=> $a['similarityScore'];
        }
        return $bExactMatch <=> $aExactMatch;
    });
} else {
    echo json_encode(['error' => 'Query failed: ' . $conn->error]);
}

header('Content-Type: application/json');
echo json_encode($matches);

$conn->close();
