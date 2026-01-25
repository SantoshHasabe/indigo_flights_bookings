const express = require('express');
const router = express.Router();
const { CityMiddlewares } = require('../../middlewares');

const { CityController } = require('../../controllers');

// /api/v1/city POST
router.post('/', 
        CityMiddlewares.validateCreateRequest,
        CityController.createCity);

// /api/v1/city GET
router.get('/', 
        CityController.getCities);

// /api/v1/city/:id GET
router.get('/:id', 
        CityController.getCity);

// /api/v1/city/:id DELETE
router.delete('/:id', 
        CityController.destroyCity);

// /api/v1/city/:id DELETE
router.patch('/:id', 
        CityController.updateCity);
module.exports = router;