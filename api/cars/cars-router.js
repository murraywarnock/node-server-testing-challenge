// DO YOUR MAGIC
const express = require('express');
const Car = require('./cars-model');
const router = express.Router();
const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique,
} = require('./cars-middleware');

router.get('/', async (req, res, next) => {
    try {
        const cars = await Car.getAll();
        res.status(200).json(cars);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', checkCarId, async (req, res, next) => {
    res.json(req.car);
});

router.post(
    '/',
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique, async (req, res, next) => {
    try {
        const cars = await Car.create(req.body);
        res.status(201).json(cars);
    } catch (error) {
        next(error);
    }
});

router.put(
    '/:id',
     checkCarId,
     checkCarPayload,
     checkVinNumberValid,
     checkVinNumberUnique, async (req, res, next) => {
    try {
        res.json('editing a new car');
    } catch (error) {
        next(error);    
    }
});
router.delete('/:id', checkCarId, async (req, res, next) => {
    try {
        res.status(200).json({message: `record id ${req.params.id} deleted`});
    } catch (error) {
        next(error);
    }
});

module.exports = router;




