const Router = require('express').Router();

const citiesController = require('../controllers/citiesController')

const {getCities, addNewCity, getCityById, deleteCity, editCity} = citiesController

Router.route('/allcities').get(getCities)


Router.route("/cities").get(getCities).post(addNewCity);


Router.route("/city/:id").get(getCityById).delete(deleteCity).put(editCity);

Router.route("/city").get(getCityById).delete(deleteCity).put(editCity);



module.exports = Router
