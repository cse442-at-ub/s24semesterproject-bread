<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Search for Professors or Classes</title>
</head>
<body>
<h2>Search for Professors or Classes</h2>
<form id="searchForm">
    <label for="query">Search:</label>
    <input type="text" id="query" name="query" required>
    
    <label for="filter">Filter by:</label>
    <select id="filter" name="filter">
        <option value="professors">Professors</option>
        <option value="classes">Classes</option>
    </select>
    
    <button type="submit">Search</button>
</form>

<div id="searchResults"></div> <!-- Container for displaying search results -->

<script>
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("searchForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way
        const query = document.getElementById("query").value;
        const filter = document.getElementById("filter").value;

        fetch(`searchFilter.php?query=${encodeURIComponent(query)}&filter=${encodeURIComponent(filter)}`)
            .then(response => response.json()) // Assuming searcFilter.php returns JSON
            .then(data => {
                const resultsContainer = document.getElementById("searchResults");
                resultsContainer.innerHTML = ''; // Clear previous results

                if (data.length > 0) {
                    const list = document.createElement('ul');
                    data.forEach(item => {
                        const li = document.createElement('li');
                        if(filter === 'classes') {
                            li.textContent = `${item.class_title} by ${item.professor_name}`;
                        } else {
                            li.textContent = item.professors;
                        }
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
