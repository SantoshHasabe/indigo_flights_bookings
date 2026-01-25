const {StatusCodes} = require('http-status-codes');

const { CityService } = require("../services");
const { SuccessResponse, ErrorResponse } = require('../utils/common');

/**
 * POST : /City
 * req-body {modelNumber: 'airbus231', capacity: 399}
 */

async function createCity(req, res) {
  try {
    const City = await CityService.createCity({
      name: req.body.name,
    });    
    SuccessResponse.data = City;
    return res.status(StatusCodes.CREATED).json(SuccessResponse);
  } catch (error) {   
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

/**
 * GET : /Cities
 */
async function getCities(req, res) {
  try {    
    const Cities =  await CityService.getCities();       
    SuccessResponse.data = Cities;
    return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
        .status(error.statusCode)
        .json(ErrorResponse);
  }
}

/**
 * GET : /City/:id
 */
async function getCity(req, res) {
  try {
    const City =  await CityService.getCity(req.params.id);
    SuccessResponse.data = City;
    return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
        .status(error.statusCode)
        .json(ErrorResponse);
  }
}

/**
 * DELETE : /City/:id
 */
async function destroyCity(req, res) {
  try {
    const City =  await CityService.destroyCity(req.params.id);
    SuccessResponse.data = City;
    return res
            .status(StatusCodes.OK)
            .json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res
        .status(error.statusCode)
        .json(ErrorResponse);
  }
}
/**
 * PATCH : /City/:id
 */
async function updateCity(req, res) {
  try {
    const City = await CityService.updateCity(
      req.params.id,               
      {
        name: req.body.name,
      }
    );
    SuccessResponse.data = City;
    return res.status(StatusCodes.OK).json(SuccessResponse);
  } catch (error) {
    ErrorResponse.error = error;
    return res.status(error.statusCode).json(ErrorResponse);
  }
}

module.exports = {
    createCity,
    getCities,
    getCity,
    destroyCity,
    updateCity
}