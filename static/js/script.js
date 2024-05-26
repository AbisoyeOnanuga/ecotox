document.addEventListener('DOMContentLoaded', function() {
    // Fetch and populate item options for the dropdown
    fetch('/products')
        .then(response => response.json())
        .then(items => {
            const select = document.getElementById('productSelect');
            select.innerHTML = '<option value="">Select an item</option>'; // Reset dropdown
            items.forEach(item => {
                const option = new Option(item, item);
                select.add(option);
            });
        });
});

// Event listener for the search button
document.getElementById('searchButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const product = document.getElementById('productSelect').value;
    fetch(`/pollutants?product=${encodeURIComponent(product)}`)
        .then(response => response.json())
        .then(data => {
            const resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = ''; // Clear previous results
            data.forEach(item => {
                const div = document.createElement('div');
                div.className = 'result-item';
                div.innerHTML = `
                    <strong>Item:</strong> ${item.Item}<br>
                    <strong>Toxic Pollutant:</strong> ${item['Toxic Pollutant']}<br>
                    <strong>Embodied Carbon (kg CO2e):</strong> ${item['Embodied Carbon (kg CO2e)']}<br>
                    <strong>Emitted Carbon (kg CO2e):</strong> ${item['Emitted Carbon (kg CO2e)']}<br>
                    <strong>Disposal Point:</strong> ${item['Disposal Point']}<br>
                    <strong>Health Impact:</strong> ${item['Health Impact']}<br>
                    <strong>How to recycle:</strong> ${item['How to recycle']}
                `;
                resultsContainer.appendChild(div);
            });
        })
        .catch(error => console.error('Error:', error));
});

document.addEventListener('DOMContentLoaded', function() {
    // Fetch all items to populate the table
    fetch('/pollutants')
        .then(response => response.json())
        .then(data => {
            populateTable(data); // Call the function to populate the table with fetched data
        })
        .catch(error => console.error('Error:', error));
});

// Function to populate the table with fetched data
function populateTable(data) {
    const tableBody = document.getElementById('data-table').querySelector('tbody');
    tableBody.innerHTML = ''; // Clear existing rows
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.Item}</td>
            <td>${item['Toxic Pollutant']}</td>
            <td>${item['Embodied Carbon (kg CO2e)']}</td>
            <td>${item['Emitted Carbon (kg CO2e)']}</td>
            <td>${item['Disposal Point']}</td>
            <td>${item['Health Impact']}</td>
            <td>${item['How to recycle']}</td>
        `;
        tableBody.appendChild(row);
    });
}