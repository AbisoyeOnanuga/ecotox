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
