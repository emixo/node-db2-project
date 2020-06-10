const express = require('express');

const db = require('../data/connection');

const router = express.Router()

router.get('/', (req, res) => {
  db('cars')
  .then(cars => {
    res.json(cars); 
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to get cars' });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db('cars')
  .where({ id })
  .then(car => {
    res.json(car);
  }) 
  .catch (err => {
    res.status(500).json({ message: 'Failed to get cars' });
  });
});

router.post('/', (req, res) => {
  const carsData = req.body;
  db('cars').insert(carsData)
  .then(ids => {
    db('cars').where({ id: ids[0] })
    .then(newCar => {
      res.status(201).json(newCar);
    });
  })
  .catch (err => {
    res.status(500).json({ message: "Failed to get data" });
  });
});

module.exports = router; 