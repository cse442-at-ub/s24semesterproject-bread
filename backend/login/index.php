<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Account Management</title>
</head>

<body>
    <h2>User Account Management</h2>
    <!-- Form action updated to point to login.php, removing the registration functionality -->
    <form action="login.php" method="post">
        <div>
            <!-- Changed from "username" to "email" to match backend changes -->
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
        </div>
        <div>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required>
        </div>
        <!-- Removed radio buttons for action selection (login/register) -->
        <button type="submit" name="action" value="login">Login</button>
    </form>
</body>

</html>