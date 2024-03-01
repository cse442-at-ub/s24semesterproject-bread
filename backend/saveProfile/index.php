<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Profile Form</title>
</head>
<body>
    <h2>Student Profile Information</h2>
    <form method="POST" action="saveProfile.php">
        <label for="user_id">User ID:</label>
        <input type="text" id="user_id" name="user_id" required><br><br>

        <label for="major">Major:</label>
        <input type="text" id="major" name="major" required><br><br>

        <label for="minor">Minor:</label>
        <input type="text" id="minor" name="minor"><br><br>

        <label for="interests">Interests:</label>
        <textarea id="interests" name="interests"></textarea><br><br>

        <label for="clubs_and_organizations">Clubs and Organizations:</label>
        <textarea id="clubs_and_organizations" name="clubs_and_organizations"></textarea><br><br>

        <label for="academic_achievements">Academic Achievements:</label>
        <textarea id="academic_achievements" name="academic_achievements"></textarea><br><br>

        <label for="gpa">GPA:</label>
        <input type="number" id="gpa" name="gpa" step="0.01" min="0" max="4.00" required><br><br>

        <button type="submit">Submit Profile</button>
    </form>
</body>
</html>
