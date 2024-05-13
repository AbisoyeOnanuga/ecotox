# ecotox
Awareness for known toxic chemicals in everyday products through web games

## Pollutants API

## Usage

### Get a list of pollutants

**Request:**
`GET /pollutants?product=<product_name>`

**Response:**
A JSON array of pollutant objects.

### Example

**Request:**
`GET /pollutants?product=paint`

**Response:**
```json
[
  {
    "Product": "Paint Removers or Strippers",
    "Toxic Chemical Ingredients/ By-products": "Methylene chloride",
    "Environmental/Health Effects": "Can cause liver cancer and other health problems.",
    "Air": 1,
    "Water": 1,
    "Land/Soil": 1
  }
]
