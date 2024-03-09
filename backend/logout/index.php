<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sign Out Form</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script>
        $(document).ready(function() {
            $('#signOutForm').submit(function(e) {
                e.preventDefault(); // Prevent the default form submission behavior

                // Gather data from the form
                var formData = {
                    email: $('#email').val(),
                    sessionID: $('#sessionID').val(),
                    userID: parseInt($('#userID').val())
                };

                // Send the data as JSON
                $.ajax({
                    type: 'POST',
                    url: 'logout.php', // Update to the path of your sign-out PHP script
                    contentType: 'application/json',
                    data: JSON.stringify(formData),
                    success: function(response) {
                        alert('Sign out successful: ' + JSON.stringify(response));
                    },
                    error: function(xhr, status, error) {
                        alert('Error signing out: ' + xhr.responseText);
                    }
                });
            });
        });
    </script>
</head>
<body>

<h2>Sign Out Test Form</h2>

<form id="signOutForm">
    <label for="email">Email:</label><br>
    <input type="text" id="email" name="email" required><br>
    <label for="sessionID">Session ID:</label><br>
    <input type="text" id="sessionID" name="sessionID" required><br>
    <label for="userID">User ID:</label><br>
    <input type="number" id="userID" name="userID" required><br><br>
    <input type="submit" value="Sign Out">
</form>

</body>
</html>
