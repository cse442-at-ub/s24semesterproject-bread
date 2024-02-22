<!DOCTYPE html>
<html>
<head>
    <title>Delete Account</title>
</head>
<body>
    <h1>Delete Account</h1>
    <form action="delete_account.php" method="post">
        <label for="username">Username:</label><br>
        <input type="text" id="username" name="username"><br>
        <label for="sessionID">Session ID:</label><br>
        <input type="text" id="sessionID" name="sessionID"><br>
        <label for="userID">User ID:</label><br>
        <input type="number" id="userID" name="userID"><br>
        <input type="submit" value="Delete Account">
    </form>
</body>
</html>
