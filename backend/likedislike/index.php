<!DOCTYPE html>
<html>
<head>
    <title>Like or Dislike Comment</title>
    <script>
        function sendLikeDislike() {
            var commentId = document.getElementById('commentId').value;
            var likeOrDislike = document.querySelector('input[name="likeOrDislike"]:checked').value;
            var action = document.querySelector('input[name="action"]:checked').value;
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "likeDislike.php", true);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    // Parse JSON response
                    var response = JSON.parse(xhr.responseText);
                    alert(response.message);
                }
            };
            xhr.send(JSON.stringify({commentId: commentId, likeOrDislike: likeOrDislike, action: action}));
        }
    </script>
</head>
<body>
    <form onsubmit="sendLikeDislike(); return false;">
        <label for="commentId">Comment ID:</label><br>
        <input type="text" id="commentId" name="commentId" required><br>
        <input type="radio" id="like" name="likeOrDislike" value="like" required>
        <label for="like">Like</label><br>
        <input type="radio" id="dislike" name="likeOrDislike" value="dislike">
        <label for="dislike">Dislike</label><br>
        <input type="radio" id="add" name="action" value="add" required>
        <label for="add">Add</label><br>
        <input type="radio" id="remove" name="action" value="remove">
        <label for="remove">Remove</label><br>
        <input type="submit" value="Send Like/Dislike">
    </form>
</body>
</html>
