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

const validator = require('../config/validator')

const usersController = require ('../controllers/usersController')
const {signUpUsers, logInUser, logOutUser, verifyEmail} = usersController;


Router.route('/auth/signup').post(validator, signUpUsers)

Router.route('/auth/login').post(logInUser)

Router.route('/auth/logout').post(logOutUser)


Router.route('/verify/:uniqueString').get(verifyEmail)

module.exports = Router
