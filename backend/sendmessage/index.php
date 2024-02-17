<!DOCTYPE html>
<html>
<head>
    <title>Send Message</title>
    <script>
        function sendMessage() {
            var message = document.getElementById('message').value;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "message.php", true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    // Parse JSON response
                    var response = JSON.parse(xhr.responseText);
                    alert(response.message);
                }
            };
            xhr.send(JSON.stringify({message: message}));
        }
    </script>
</head>
<body>
    <form onsubmit="sendMessage(); return false;">
        <label for="message">Message:</label><br>
        <input type="text" id="message" name="message" required><br>
        <input type="submit" value="Send Message">
    </form>
</body>
</html>
