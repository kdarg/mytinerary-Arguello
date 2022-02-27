const Router = require('express').Router();

const citiesController = require('../controllers/citiesController')

const {getCities} = citiesController

Router.route('/allcities')
.get(getCities)
module.exports = Router
