const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const { FlightRepository } = require('../repositories');
const { compareTime } = require('../utils/helper/datetime-helper');
const { Op } = require('sequelize');

const flightRepository = new FlightRepository();


async function createFlight(data){
    try {
        if (!compareTime(data.arrivalTime, data.departureTime)) {
            throw new AppError(
                'Arrival time must be greater than departure time',
                StatusCodes.BAD_REQUEST
            );
        }
        const flight = await flightRepository.create(data);
        return flight;
        
    } catch (error) {       
        if (error instanceof AppError) {
            throw error;
        }
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const explanation = error.errors.map(err => err.message);
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            throw new AppError(
                'Invalid foreign key reference while creating flight',
                StatusCodes.BAD_REQUEST
            );
        }
        // if(error.name == 'SequelizeValidationError' || error.name =='SequelizeUniqueConstraintError'){
        //     let explanation = [];
        //     error.errors.forEach(err => {
        //         explanation.push(err.message);
        //     });
        //     throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        // }else if(error.name == 'SequelizeForeignKeyConstraintError'){
        //     throw new AppError('Cannot create a new flight object! Foreign key not match', StatusCodes.INTERNAL_SERVER_ERROR);
        // }
        throw new AppError('Cannot create a new flight object', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}
async function getAllFlights(query) {
    // trips=MUM-DEL
    let customFilter = {};
    let sortFilter = [];
    const endingTripTime = " 23:59:00";
    if(query.trips){
        [departureAirportId, arrivalAirportId] = query.trips.split("-");
        customFilter.departureAirportId = departureAirportId;
        customFilter.arrivalAirportId = arrivalAirportId;
    }
    if(query.price){
        [minPrice, maxPrice] = query.price.split("-");
        customFilter.price = {
            [Op.between]: [minPrice, (maxPrice === undefined) ? 20000 :maxPrice],
        }
    }   
    if(query.travelers){
        customFilter.totalSeats = {
            [Op.gte]: query.travelers
        }
    }
    if(query.tripDate){ 
        customFilter.departureTime = {
            [Op.between]: [query.tripDate, query.tripDate+endingTripTime]
        }
    }
    if(query.sort){ 
        const params = query.sort.split(',');
        const sortFilters = params.map((param) => param.split('_'));
        sortFilter = sortFilters;
    }    
    try {
        const flights = await flightRepository.getAllFlights(customFilter,sortFilter);
        return flights;
    } catch (error) {
        throw new AppError('Cannot fetch data of the all flights', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createFlight,
    getAllFlights
}