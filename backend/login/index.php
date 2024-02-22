<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Account Management</title>
</head>
<body>
    <h2>User Account Management</h2>
    <!-- Updated form action to handle both login and registration -->
    <form action="login.php" method="post">
        <div>
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required>
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
        </div>
        <div>
            <!-- Radio buttons for user to select action -->
            <input type="radio" id="login" name="action" value="login" checked>
            <label for="login">Login</label><br>
            <input type="radio" id="register" name="action" value="register">
            <label for="register">Register</label>
        </div>
        <button type="submit">Submit</button>
    </form>
</body>
</html>
