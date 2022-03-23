const Router = require('express').Router();

// CITIES

const citiesController = require('../controllers/citiesController');
const {getCities, addNewCity, getCityById, deleteCity, editCity} = citiesController;

Router.route('/allcities').get(getCities);
Router.route("/cities").get(getCities).post(addNewCity);
Router.route("/city/:id").get(getCityById).delete(deleteCity).put(editCity);

// ITINERARIES

const itinerariesController = require('../controllers/itinerariesController');
const {getAllItineraries, addItinerary, getItineraryById, deleteItinerary, editItinerary, getItinerariesByCity, likeItinerary} = itinerariesController;


Router.route("/itineraries").get(getAllItineraries).post(addItinerary);

Router.route("/itineraries/:id").get(getItinerariesByCity);

Router.route("/itinerary/:id").get(getItineraryById).delete(deleteItinerary).put(editItinerary);

// LOG IN - SIGN UP - LOG OUT

const validator = require('../config/validator')

const usersController = require ('../controllers/usersController')
const {signUpUsers, logInUser, logOutUser, verifyEmail, VerifyToken} = usersController;

Router.route('/auth/signup').post(validator, signUpUsers)

Router.route('/auth/login').post(logInUser)

//Router.route('/auth/signOut').post(logOutUser)

// VERIFY AND VERIFY TOKEN

Router.route('/verify/:uniqueString').get(verifyEmail)

const passport = require('../config/passport')

Router.route('/auth/signInToken').get(passport.authenticate('jwt',{ session:false }), VerifyToken)

// LIKES AND DISLIKES

Router.route('/itinerary/like/:id').put(passport.authenticate('jwt',{ session:false }), likeItinerary) 

// ACTIVITIES

const activityControllers = require('../controllers/activitiesController');

const { getActivities, addActivity, getActivity, deleteActivity, editActivity, getActivityByItinterary } = activityControllers;

Router.route('/activities').get(getActivities).post(addActivity)

Router.route('/activities/:id').get(getActivity).delete(deleteActivity).put(editActivity)

Router.route('/activities/itinerary/:id').get(getActivityByItinterary)


module.exports = Router
