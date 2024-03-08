<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Account Management</title>
</head>
<body>
    <h2>User Account Management</h2>
    <form action="login.php" method="post">
        <div>
            <label for="identifier">Email/Username:</label>
            <input type="text" id="identifier" name="identifier" required>
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
        </div>
        <div>
            <input type="hidden" name="action" value="login">
        </div>
        <button type="submit">Login</button>
    </form>
</body>
</html>
