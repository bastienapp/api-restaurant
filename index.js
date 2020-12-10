const express = require('express');
const app = express();
const port = 8080;

const connection = require('./config');

connection.connect(function (err) {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }

  console.log(`connected as id ${connection.threadId}`);
});

app.listen(port, () => {
  console.log(`port ${port} OK`);
});

app.get('/restaurants', (request, response) => {
  connection.query('SELECT * FROM restaurant', (error, result) => {
    if (error) {
      response.status(500).json({
        error: error,
      });
    } else {
      response.status(200).json({
        data: result,
      });
    }
  });
});

app.get('/restaurants/:id', (request, response) => {
  const { id } = request.params;
  connection.query(
    `SELECT * FROM restaurant WHERE id = ${id}`,
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
        response.status(200).json({
          data: result[0],
        });
      }
    }
  );
});
