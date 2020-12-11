const express = require('express');
var cors = require('cors');
const app = express();
const port = 8080;

app.use(cors());

const connection = require('./config');
const { request, response } = require('express');

// CRUD - Create Read Update Delete
connection.connect(function (err) {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }

  console.log(`connected as id ${connection.threadId}`);
});
app.use(express.json());

app.listen(port, () => {
  console.log(`port ${port} OK`);
});

// restaurants?city=Nantes : request query
app.get('/restaurants', (request, response) => {
  const city = request.query.city;
  const where = city ? ' WHERE city = ?' : '';
  connection.query(
    'SELECT * FROM restaurant' + where,
    [city],
    (error, result) => {
      if (error) {
        response.status(500).json({
          error: error,
        });
      } else {
        response.status(200).json(result);
      }
    }
  );
});

app.get('/restaurants/:id', (request, response) => {
  connection.query(
    `SELECT * FROM restaurant WHERE id = ?`,
    [request.params.id],
    (error, result) => {
      if (error) {
        response.status(500).json({
          error: error,
        });
      } else if (result.length === 0) {
        response.status(404).json({
          error: `restaurant ${id} not found`,
        });
      } else {
        response.status(200).json(result[0]);
      }
    }
  );
});

app.post('/restaurants', (request, response) => {
  const { name, city } = request.body;
  connection.query(
    `INSERT INTO restaurant(name, city) VALUES (?, ?)`,
    [name, city],
    (error, result) => {
      if (error) {
        response.status(500).json({
          error: error,
        });
      } else {
        response.status(200).json({
          id: result.insertId,
          ...request.body,
        });
      }
    }
  );
});
