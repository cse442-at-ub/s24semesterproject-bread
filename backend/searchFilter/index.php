<!DOCTYPE html>
<html lang="en">
<head>
    <title>Professor Search</title>
</head>
<body>
    <h2>Search for a Professor</h2>
    <form id="searchForm">
        <label for="query">Search:</label>
        <input type="text" id="query" name="query" required>
        <button type="submit">Search</button>
    </form>
    <div id="searchResults"></div> <!-- Container for displaying search results -->
    <script>
    document.addEventListener("DOMContentLoaded", function() {
        document.getElementById("searchForm").addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent the form from submitting the traditional way
            const query = document.getElementById("query").value;
            
            fetch(`searchFilter.php?query=${encodeURIComponent(query)}`)
                .then(response => response.json()) // Assuming search.php returns JSON
                .then(data => {
                    const resultsContainer = document.getElementById("searchResults");
                    resultsContainer.innerHTML = ''; // Clear previous results
                    
                    if (data.length > 0) {
                        const list = document.createElement('ul');
                        data.forEach(item => {
                            const li = document.createElement('li');
                            // Assuming 'professor_name' is the attribute for the professor's name
                            // and 'classes' is a string with classes separated by commas
                            li.innerHTML = `<strong>${item.professors}</strong> teaches: ${item.classes.split(',').join(', ')}`;
                            list.appendChild(li);
                        });
                        resultsContainer.appendChild(list);
                    } else {
                        resultsContainer.textContent = 'No results found.';
                    }
                })
                .catch(error => console.error('Error fetching search results:', error));
        });
    });
    </script>
</body>
</html>
