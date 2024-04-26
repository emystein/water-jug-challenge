# Water Jugs Challenge

This project's intent is to solve a variation of the Water Jugs problem.

It provides a simple RESTful API to mix jugs to get to a target volume.

## Requirements

- Node.js (version 14 or higher)
- npm (Node.js package manager)

## Installation

1. Clone this repository:

```bash
git clone https://github.com/emystein/water-jug-challenge.git
cd water-jug-challenge
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

The server will start running at `http://localhost:3000`.

## API Endpoints

### POST /mix

This endpoint mixes two jugs with given volumes and a target volume.

#### Request Body

- `jugX`: Volume of jug X (positive number)
- `jugY`: Volume of jug Y (positive number)
- `targetVolume`: Target volume to achieve (positive number)

#### Response

- `200 OK`: If mixing is successful, returns the mixing result.
- `400 Bad Request`: If any of the input parameters (jugX, jugY, targetVolume) are not positive numbers.

### Example

#### Success
Mixing jugs with volumes jugX=2, jugY=10, targetVolume=4:

```bash
curl -X POST http://localhost:3000/mix -H "Content-Type: application/json" -d '{"jugX":2,"jugY":10,"targetVolume":4}'
```

should return a JSON response like this:

```json
{
  "status": "Solved",
  "solution": [
    {
      "step": 1,
      "jugX": 2,
      "jugY": 0,
      "action": "Fill Jug X"
    },
    {
      "step": 2,
      "jugX": 0,
      "jugY": 2,
      "action": "Transfer from Jug X to Jug Y"
    },
    {
      "step": 3,
      "jugX": 2,
      "jugY": 2,
      "action": "Fill Jug X"
    },
    {
      "step": 4,
      "jugX": 0,
      "jugY": 4,
      "action": "Transfer from Jug X to Jug Y"
    }
  ]
}
```

#### No Solution
Mixing jugs with volumes jugX=2, jugY=6, targetVolume=5:

```bash
curl -X POST http://localhost:3000/mix -H "Content-Type: application/json" -d '{"jugX":2,"jugY":6,"targetVolume":5}'
```

should return a JSON response like this:

```json
{
  "status": "No Solution",
  "solution": []
}
```

## Tests

To run the tests:

```bash
npm test
```
