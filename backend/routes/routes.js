const Router = require('express').Router();

const citiesController = require('../controllers/citiesController');
const {getCities, addNewCity, getCityById, deleteCity, editCity} = citiesController;

Router.route('/allcities').get(getCities);
Router.route("/cities").get(getCities).post(addNewCity);
Router.route("/city/:id").get(getCityById).delete(deleteCity).put(editCity);


const itinerariesController = require('../controllers/itinerariesController');
const {getAllItineraries, addItinerary, getItineraryById, deleteItinerary, editItinerary, getItinerariesByCity} = itinerariesController;


Router.route("/itineraries").get(getAllItineraries).post(addItinerary);

Router.route("/itineraries/:id").get(getItinerariesByCity);

Router.route("/itinerary/:id").get(getItineraryById).delete(deleteItinerary).put(editItinerary);



module.exports = Router
