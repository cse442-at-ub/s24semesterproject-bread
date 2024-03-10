<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Logout Form</title>
</head>
<body>
    <h2>Logout Form</h2>
    <!-- Display form for user input -->
    <form method="POST">
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
        </div>
        <div>
            <label for="sessionID">Session ID:</label>
            <input type="text" id="sessionID" name="sessionID" required>
        </div>
        <div>
            <label for="userID">User ID:</label>
            <input type="number" id="userID" name="userID" required>
        </div>
        <button type="submit" name="logout" value="true">Log Out</button>
    </form>

    <?php
    if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['logout'])) {
        // Assuming these are the correct variables to receive.
        $email = $_POST['email'];
        $sessionID = $_POST['sessionID'];
        $userID = $_POST['userID'];

        // Here, instead of calling the function directly as in the previous example,
        // you should process the logout logic, possibly redirecting to or including the logout.php script.
        // For the sake of this example, let's assume logout.php handles the logic based on POST data directly.

        // Redirect to the logout.php script with POST data.
        // Note: This is a simplistic approach for demonstration.
        // In practice, you'd likely use session management and more secure methods for logout.
        include 'logout.php'; // Or redirect to logout.php if it's designed to work standalone.
    }
    ?>
</body>
</html>
