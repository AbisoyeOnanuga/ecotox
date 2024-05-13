from flask import Flask, jsonify, request, render_template
import pandas as pd
import json

app = Flask(__name__)

data = pd.read_csv('data/everyday_toxins.csv')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/pollutants', methods=['GET'])
def get_pollutants():
    # Retrieve query parameters for filtering, if any
    product = request.args.get('product', default=None, type=str)

    # Filter data based on the product, if provided
    if product:
        filtered_data = data[data['Product'].str.contains(product, case=False, na=False)]
    else:
        filtered_data = data

    # Prepare the response data with user-friendly pollution information
    response_data = []
    for _, row in filtered_data.iterrows():
        item = {
            "Product": row['Product'],
            "Toxic Chemical Ingredients/ By-products": row['Toxic Chemical Ingredients/ By-products'],
            "Environmental/Health Effects": row['Environmental/Health Effects'],
            "Pollutes Air": "Yes" if row['Air'] == 1 else "No",
            "Pollutes Water": "Yes" if row['Water'] == 1 else "No",
            "Pollutes Land/Soil": "Yes" if row['Land/Soil'] == 1 else "No"
        }
        response_data.append(item)

    return jsonify(response_data)


@app.route('/products', methods=['GET'])
def get_products():
    products = data['Product'].dropna().unique().tolist()
    return jsonify(products)

if __name__ == '__main__':
    app.run(debug=True)
