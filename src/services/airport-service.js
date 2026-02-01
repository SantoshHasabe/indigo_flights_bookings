const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const { AirportRepository } = require('../repositories');

const airportRepository = new AirportRepository();


async function createAirport(data){
    try {
        const airport = await airportRepository.create(data);
        return airport;
    } catch (error) {        
        if(error.name == 'SequelizeValidationError' || error.name =='SequelizeUniqueConstraintError' ){
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }else if(error.name == 'SequelizeForeignKeyConstraintError'){
             throw new AppError('Cannot create a new airport object! Foreign key not match', StatusCodes.INTERNAL_SERVER_ERROR);
        }
        throw new AppError('Cannot create a new airport object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirports() {
    try {
        const airports = await airportRepository.getAll();
        return airports;
    } catch (error) {
        throw new AppError("Can not fetch data of all airports", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirport(id) {
    try {        
        const airport = await airportRepository.get(id);
        return airport;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("The airport you requested not found", error.statusCode);
        }
        throw new AppError("Can not fetch data of Airport", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function destroyAirport(id) {
    try {        
        const response = await airportRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("Airport you requested to delete not found", error.statusCode);
        }
        throw new AppError("Can not destroy airport", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function updateAirport(id, data){
    try {        
        const response = await airportRepository.update(id,data);
        return response;
    } catch (error) { 
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError("Airport you requested to update not found", error.statusCode);
        }   
        throw new AppError("Can not update airport", StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}