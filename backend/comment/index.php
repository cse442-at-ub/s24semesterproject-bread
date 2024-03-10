<!DOCTYPE html>
<html>
<head>
    <title>Send Comment</title>
    <script>
        function sendComment() {
            var comment = document.getElementById('comment').value;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "comment.php", true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    // Parse JSON response
                    var response = JSON.parse(xhr.responseText);
                    alert(response.message);
                }
            };
            xhr.send(JSON.stringify({comment: comment}));
        }
    </script>
</head>
<body>
    <form onsubmit="sendComment(); return false;">
        <label for="comment">Comment:</label><br>
        <textarea id="comment" name="comment" required></textarea><br>
        <input type="submit" value="Send Comment">
    </form>
</body>
</html>
