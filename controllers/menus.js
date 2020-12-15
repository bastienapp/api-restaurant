const express = require('express');
const router = express.Router();

const connection = require('../database');

// CRUD
router.get('/', (request, response) => {
  connection.query('SELECT * FROM menu', (error, result) => {
    if (error) {
      response.status(500).json({
        error: error,
      });
    } else {
      response.status(200).json(result);
    }
  });
});

router.get('/:id', (request, response) => {
  connection.query(
    `SELECT * FROM menu WHERE id = ?`,
    [request.params.id],
    (error, result) => {
      if (error) {
        response.status(500).json({
          error: error,
        });
      } else if (result.length === 0) {
        response.status(404).json({
          error: `menu ${id} not found`,
        });
      } else {
        response.status(200).json(result[0]);
      }
    }
  );
});

router.post('/', (request, response) => {
  const { title, id_restaurant } = request.body;
  connection.query(
    `INSERT INTO menu(title, id_restaurant) VALUES (?, ?)`,
    [title, id_restaurant],
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
  const { title, id_restaurant } = request.body;
  connection.query(
    `UPDATE menu SET title = ?, id_restaurant = ? WHERE id = ?`,
    [title, id_restaurant, id],
    (error, result) => {
      if (error) {
        response.status(500).json({
          error: error,
        });
      } else if (result.affectedRows === 0) {
        response.status(204).json({
          error: `menu ${id} not found`,
        });
      } else {
        response.status(200).json({ id: id, name: name, city: city });
      }
    }
  );
});

router.delete('/:id', (request, response) => {
  const { id } = request.params;
  connection.query(`DELETE FROM menu WHERE id = ?`, [id], (error, result) => {
    if (error) {
      response.status(500).json({
        error: error,
      });
    } else if (result.affectedRows === 0) {
      response.status(204).json({
        error: `menu ${id} not found`,
      });
    } else {
      response.sendStatus(200);
    }
  });
});

module.exports = router;
