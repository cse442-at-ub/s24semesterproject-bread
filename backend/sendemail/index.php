<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title>Send Email</title>
    </head>
    <body>
        Email <input type="email" id="email" value=""> <br>
        Subject <input type="text" id="subject" value=""> <br>
        Message <input type="text" id="message" value=""> <br>
        <button type="button" id="send">Send</button>
        <button type="back" name="back">Return to home</button>

        <script>
            document.getElementById('send').addEventListener('click', function() {
                var email = document.getElementById('email').value;
                var subject = document.getElementById('subject').value;
                var message = document.getElementById('message').value;

                fetch('send.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        subject: subject,
                        message: message
                    })
                }).then(function(response) {
                    if (!response.ok) {
                        throw new Error('HTTP error ' + response.status);
                    }
                    return response.json();
                }).then(function(data) {
                    alert(data.message);
                }).catch(function(error) {
                    console.log(error);
                });
            });
        </script>
    </body>
</html>
