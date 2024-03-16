<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Logout Form</title>
    <script>
        // Function to handle the form submission
        function handleLogout(event) {
            // Prevent the default form submission
            event.preventDefault();

            // Get the form data
            const email = document.getElementById('email').value;
            const sessionID = document.getElementById('sessionID').value;
            const userID = document.getElementById('userID').value;

            // Construct the JSON payload
            const data = {
                email,
                sessionID,
                userID
            };

            // Send the JSON data using fetch
            fetch('logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        sessionID,
                        userID,
                        action: 'logout'
                    }),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok: ' + response.statusText);
                    }
                    // Check or log the Content-Type
                    console.log(response.headers.get('Content-Type'));
                    return response.text(); // Use text() instead of json() to see what's coming back
                })
                .then(text => {
                    try {
                        const data = JSON.parse(text); // Try to parse text as JSON
                        console.log('Logout successful:', data);
                    } catch (err) {
                        throw new Error('Failed to parse JSON: ' + err.message);
                    }
                })
                .catch(error => {
                    console.error('Logout error:', error);
                });
        }
    </script>
</head>

<body>
    <h2>Logout Form</h2>
    <!-- Display form for user input -->
    <form id="logout-form" method="POST">
        <div>
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
        </div>
        <div>
            <label for="sessionID">Session ID:</label>
            <input type="text" id="sessionID" name="sessionID" required>
        </div>
        <div>
            <label for="userID">User ID:</label>
            <input type="number" id="userID" name="userID" required>
        </div>
        <button type="submit" name="logout" value="true">Log Out</button>
    </form>
</body>

</html>