const express = require('express');
const { InfoController } = require('../../controllers');
const router = express.Router();
const airplaneRoutes = require('./airplane-routes');
const cityRoutes = require('./city-routes');
const AirportRoutes = require('./airport-routes');

router.use('/airplanes',airplaneRoutes);
router.use('/city',cityRoutes);
router.use('/airports',AirportRoutes);

router.get('/info',InfoController.info)

module.exports = router;