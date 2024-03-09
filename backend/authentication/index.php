<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Authentication</title>
</head>
<body>

<h2>User Authentication</h2>

<!-- The form action should point to the PHP script that processes the authentication -->
<form method="POST" action="authenticate.php">
    <label for="userID">User ID:</label>
    <input type="number" id="userID" name="userID" required><br><br>

    <label for="username">Username:</label>
    <input type="text" id="username" name="username" required><br><br>

    <label for="sessionID">Session ID:</label>
    <input type="text" id="sessionID" name="sessionID" required><br><br>

    <button type="submit">Authenticate</button>
</form>

</body>
</html>
