const express = require('express');
const Restaurant = require('../../models/Restaurant');
const router = express.Router();

router.get('/', (request, response) => {
  Restaurant.findAll(
    (result) => {
      response.status(200).json(result);
    },
    (error) => {
      response.status(500).json({
        error: error,
      });
    }
  );
});

router.get('/:id', (request, response) => {
  const { id } = request.params;
  Restaurant.findOne(
    id,
    (result) => {
      if (result.length === 0) {
        response.status(404).json({
          error: `${id} not found`,
        });
      } else {
        response.status(200).json(result[0]);
      }
    },
    (error) => {
      response.status(500).json({
        error: error,
      });
    }
  );
});

router.post('/', (request, response) => {
  Restaurant.create(
    request.body,
    (result) => {
      response.status(201).json({
        id: result,
        ...request.body,
      });
    },
    (error) => {
      response.status(500).json({
        error: error,
      });
    }
  );
});

router.put('/:id', (request, response) => {
  const { id } = request.params;
  Restaurant.update(
    id,
    request.body,
    (result) => {
      if (!result) {
        response.status(204).json({
          error: `${id} not found`,
        });
      } else {
        response.sendStatus(200);
      }
    },
    (error) => {
      response.status(500).json({
        error: error,
      });
    }
  );
});

router.delete('/:id', (request, response) => {
  const { id } = request.params;
  Restaurant.delete(
    id,
    (result) => {
      if (!result) {
        response.status(204).json({
          error: `${id} not found`,
        });
      } else {
        response.sendStatus(200);
      }
    },
    (error) => {
      response.status(500).json({
        error: error,
      });
    }
  );
});

module.exports = router;
