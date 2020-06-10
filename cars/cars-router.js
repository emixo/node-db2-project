const express = require('express');
const knex = require('knex')
const configOptions = require('../knexfile').development
const db = knex(configOptions)

const router = express.Router()

router.get('/', (req, res) => {
  db('carInfo')
  .then(cars => {
    res.json(cars); 
  })
  .catch (err => {
      console.log(err)
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
  db('carInfo').insert(carsData)
  .then(ids => {
    db('carInfo').where({ id: ids[0] })
    .then(newCar => {
      res.status(201).json(newCar);
    });
  })
  .catch (err => {
    res.status(500).json({ message: "Failed to get data" });
  });
});

module.exports = router; 