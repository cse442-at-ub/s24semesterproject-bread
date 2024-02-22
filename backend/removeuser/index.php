<!DOCTYPE html>
<html>
<head>
    <title>Test Page</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script>
        $(document).ready(function(){
            $("#submit").click(function(e){
                e.preventDefault();
                var username = $("#username").val();
                var sessionId = $("#sessionId").val();
                var userID = $("#userID").val();
                $.ajax({
                    url: 'remove.php',
                    type: 'post',
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function (data) {
                        $('#result').html(data.message);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        $('#result').html('Error: ' + textStatus + ' ' + errorThrown);
                    },
                    data: JSON.stringify({ "username": username, "sessionId": sessionId, "userID": userID })
                });
            });
        });
    </script>
</head>
<body>
    <h1>Welcome to the Test Page</h1>
    <p>This is a simple test page for the remove.php script.</p>
    <form>
        <label for="username">Username:</label><br>
        <input type="text" id="username" name="username"><br>
        <label for="sessionId">Session ID:</label><br>
        <input type="text" id="sessionId" name="sessionId"><br>
        <label for="userID">User ID:</label><br>
        <input type="number" id="userID" name="userID"><br>
        <input type="submit" id="submit" value="Submit">
    </form>
    <div id="result"></div>
</body>
</html>
