const express = require('express');
const router = express.Router();
const { AirplaneMiddlewares } = require('../../middlewares');
const { AirplaneController } = require('../../controllers');

// /api/v1/airplanes POST
router.post('/', 
        AirplaneMiddlewares.validateCreateRequest,
        AirplaneController.createAirplane);

// /api/v1/airplanes GET
router.get('/', 
        AirplaneController.getAirplanes);

// /api/v1/airplanes/:id GET
router.get('/:id', 
        AirplaneController.getAirplane);
 
module.exports = router;