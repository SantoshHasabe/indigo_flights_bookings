const express = require('express');
const router = express.Router();
const { AirportMiddlewares } = require('../../middlewares');
const { AirportController } = require('../../controllers')

// /api/v1/airplanes POST
router.post('/', 
        AirportMiddlewares.validateCreateRequest,
        AirportController.createAirport);

// /api/v1/airplanes GET
router.get('/', 
        AirportController.getAirports);

// /api/v1/airplanes/:id GET
router.get('/:id', 
        AirportController.getAirport);

// /api/v1/airplanes/:id DELETE
router.delete('/:id', 
        AirportController.destroyAirport);

// /api/v1/airplanes/:id DELETE
router.patch('/:id', 
        AirportController.updateAirport);
module.exports = router;