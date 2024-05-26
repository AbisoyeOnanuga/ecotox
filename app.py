from flask import Flask, jsonify, request, render_template
import pandas as pd
import json

app = Flask(__name__)

# Load the CSV data into a DataFrame
data = pd.read_csv('data/everyday_toxins.csv')

@app.route('/')
def home():
    # Serve the main page
    return render_template('index.html')

@app.route('/pollutants', methods=['GET'])
def get_pollutants():
    # Retrieve query parameters for filtering
    product = request.args.get('product', default=None, type=str)

    # Filter data based on the product, if provided
    filtered_data = data[data['Item'].str.contains(product, case=False, na=False)] if product else data

    # Convert the DataFrame to a list of dictionaries for JSON response
    response_data = filtered_data.to_dict(orient='records')

    return jsonify(response_data)

@app.route('/products', methods=['GET'])
def get_products():
    # Get a list of unique items
    items = data['Item'].dropna().unique().tolist()
    return jsonify(items)

if __name__ == '__main__':
    app.run(debug=True)
