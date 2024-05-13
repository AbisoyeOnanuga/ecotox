document.addEventListener('DOMContentLoaded', function() {
    fetch('/products')
        .then(response => response.json())
        .then(products => {
            var select = document.getElementById('productSelect');
            products.forEach(function(product) {
                var option = document.createElement('option');
                option.value = product;
                option.textContent = product;
                select.appendChild(option);
            });
        });
});

document.getElementById('searchButton').addEventListener('click', function() {
    var product = document.getElementById('productSelect').value;
    fetch('/pollutants?product=' + encodeURIComponent(product))
        .then(response => response.json())
        .then(data => {
            var resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = ''; // Clear previous results
            data.forEach(function(item) {
                var div = document.createElement('div');
                div.className = 'result-item';
                div.innerHTML = `
                    <strong>Product:</strong> ${item.Product}<br>
                    <strong>Toxic Chemical Ingredients/ By-products:</strong> ${item['Toxic Chemical Ingredients/ By-products']}<br>
                    <strong>Environmental/Health Effects:</strong> ${item['Environmental/Health Effects']}<br>
                    <strong>Pollutes Air:</strong> ${item['Pollutes Air']}<br>
                    <strong>Pollutes Water:</strong> ${item['Pollutes Water']}<br>
                    <strong>Pollutes Land/Soil:</strong> ${item['Pollutes Land/Soil']}
                `;
                resultsContainer.appendChild(div);
            });
        })
        .catch(error => console.error('Error:', error));
});

function searchProducts() {
    var product = document.getElementById('productSelect').value;
    fetch('/pollutants?product=' + encodeURIComponent(product))
        .then(response => response.json())
        .then(data => {
            var resultsContainer = document.getElementById('results');
            resultsContainer.innerHTML = ''; // Clear previous results
            data.forEach(function(item) {
                var div = document.createElement('div');
                div.className = 'result-item';
                div.innerHTML = `
                    <strong>Product:</strong> ${item.Product}<br>
                    <strong>Toxic Chemical Ingredients/ By-products:</strong> ${item['Toxic Chemical Ingredients/ By-products']}<br>
                    <strong>Environmental/Health Effects:</strong> ${item['Environmental/Health Effects']}<br>
                    <strong>Pollutes Air:</strong> ${item['Pollutes Air']}<br>
                    <strong>Pollutes Water:</strong> ${item['Pollutes Water']}<br>
                    <strong>Pollutes Land/Soil:</strong> ${item['Pollutes Land/Soil']}
                `;
                resultsContainer.appendChild(div);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Fetch data from your backend API
document.addEventListener('DOMContentLoaded', function() {
    fetch('/api/get-data')
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            const tableBody = document.querySelector('#data-table tbody');

            // Clear any existing rows
            tableBody.innerHTML = '';

            // Iterate through the data and create table rows
            data.forEach(item => {
                // Create a table row element
                const row = document.createElement('tr');

                // Convert boolean values to 'Yes' or 'No'
                const airValue = item['Pollutes Air'] === "Yes" ? 'Yes' : 'No';
                const waterValue = item['Pollutes Water'] === "Yes" ? 'Yes' : 'No';
                const landSoilValue = item['Pollutes Land/Soil'] === "Yes" ? 'Yes' : 'No';

                // Set the innerHTML of the row with the data
                row.innerHTML = `
                    <td>${item.Product}</td>
                    <td>${item['Toxic Chemical Ingredients/ By-products']}</td>
                    <td>${item['Environmental/Health Effects']}</td>
                    <td>${airValue}</td>
                    <td>${waterValue}</td>
                    <td>${landSoilValue}</td>
                `;

                // Append the row to the table body
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            // Optionally, handle the error in the UI as well
        });
});
