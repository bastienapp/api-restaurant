const express = require('express');
const router = express.Router();

const connection = require('../database');

// CRUD
router.get('/', (request, response) => {
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

router.get('/:id', (request, response) => {
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

router.post('/', (request, response) => {
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
        response.status(201).json({
          id: result.insertId,
          ...request.body,
        });
      }
    }
  );
});

router.put('/:id', (request, response) => {
  const { id } = request.params;
  const { name, city } = request.body;
  connection.query(
    `UPDATE restaurant SET name = ?, city = ? WHERE id = ?`,
    [name, city, id],
    (error, result) => {
      if (error) {
        response.status(500).json({
          error: error,
        });
      } else if (result.affectedRows === 0) {
        response.status(204).json({
          error: `restaurant ${id} not found`,
        });
      } else {
        response.status(200).json({ id: id, name: name, city: city });
      }
    }
  );
});

router.delete('/:id', (request, response) => {
  const { id } = request.params;
  connection.query(
    `DELETE FROM restaurant WHERE id = ?`,
    [id],
    (error, result) => {
      if (error) {
        response.status(500).json({
          error: error,
        });
      } else if (result.affectedRows === 0) {
        response.status(204).json({
          error: `restaurant ${id} not found`,
        });
      } else {
        response.sendStatus(200);
      }
    }
  );
});

module.exports = router;
