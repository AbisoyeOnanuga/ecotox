# Ecotox
Raising awareness about toxic chemicals in everyday products through an interactive web platform.

## Overview
The Ecotox API provides access to a database of common products and the toxic chemicals they contain. It is designed to inform users about the environmental and health effects of these chemicals, as well as their impact on air, water, and soil.

## Getting Started
To use the Ecotox API, make a request to the endpoint with the name of the product you're interested in. The API will return a JSON response with detailed information about the toxic chemicals associated with that product.

## API Usage

### Retrieve Information on Pollutants

**Endpoint:**
`GET /pollutants`

**Parameter:**
- `product`: The name of the product to search for.

**Response:**
A JSON array of objects, each containing detailed information about a pollutant.

### Example Request

**Fetch data for 'paint':**
`GET /pollutants?product=paint`

**Example Response:**
```json```
[
  {
    "Product": "Paint Removers or Strippers",
    "Toxic Chemical Ingredients/ By-products": "Methylene chloride",
    "Environmental/Health Effects": "Can cause liver cancer and other health problems.",
    "Pollutes Air": "Yes",
    "Pollutes Water": "Yes",
    "Pollutes Land/Soil": "Yes"
  }
]

```Note: The values for “Pollutes Air,” “Pollutes Water,” and “Pollutes Land/Soil” are returned as “Yes” or “No” based on whether the product has an impact on that ecological environment.```

## Testing the API
You can test the Ecotox API directly in your web browser or using a command-line tool like ```curl.```

## Browser Testing
Enter the API endpoint URL in your browser’s address bar. For example:

```http://your-api-url.com/pollutants?product=paint```


## Terminal Testing
Use ```curl``` to send a GET request from your terminal:

```curl "http://your-api-url.com/pollutants?product=paint"```
