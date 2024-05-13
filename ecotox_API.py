from flask import Flask, jsonify, request
import pandas as pd
import json

app = Flask(__name__)

data = pd.read_csv('data/everyday_toxins.csv')

@app.route('/pollutants', methods=['GET'])
def get_pollutants():
    # Retrieve query parameters for filtering, if any
    product = request.args.get('product', default=None, type=str)

    # Filter data based on the product, if provided
    if product:
        filtered_data = data[data['Product'].str.contains(product, case=False, na=False)]
    else:
        filtered_data = data

    # Convert DataFrame to JSON
    result = filtered_data.to_json(orient='records')
    parsed = json.loads(result)
    return jsonify(parsed)

if __name__ == '__main__':
    app.run(debug=True)
