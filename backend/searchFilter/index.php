<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Search for Professors or Classes</title>
    <style>
        .result-item {
            margin-bottom: 20px;
            padding: 10px;
            border: 1px solid #ddd;
        }
    </style>
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
            .then(response => response.json())
            .then(data => {
                const resultsContainer = document.getElementById("searchResults");
                resultsContainer.innerHTML = ''; // Clear previous results

                if (data.length > 0) {
                    data.forEach(item => {
                        const div = document.createElement('div');
                        div.className = 'result-item';

                        if(filter === 'professors') {
                            // Create a more detailed display for professor information
                            div.innerHTML = `<strong>${item.professors}</strong><br>
                                             Department: ${item.department}<br>
                                             Education: ${item.education}<br>
                                             Research: ${item.research}<br>
                                             Email: ${item.email}<br>
                                             Office: ${item.office}<br>
                                             Phone: ${item.phone}<br>
                                             Classes: ${item.classes}<br>
                                             Difficulty: ${item.difficulty}, Helpfulness: ${item.helpfulness}, Clarity: ${item.clarity}, Feedback Quality: ${item['Feedback Quality']}, Accessibility: ${item.accessibility}`;
                        } else {
                            // Assuming you'd adjust to handle class-specific information similarly
                            div.textContent = `${item.class_title} by ${item.professor_name}`;
                        }

                        resultsContainer.appendChild(div);
                    });
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
