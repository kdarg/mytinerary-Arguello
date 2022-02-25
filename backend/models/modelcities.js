const mongoose = require('mongoose')

const citiesSchema = new mongoose.Schema({
country: {type:String, required:true},
city: {type:String, required:true},
src: {type:String, required:true},
description: {type:String, required:true}
})

const myCities = mongoose.model('cities',citiesSchema) //'cities' es mi coleccion mongodb dentro de mytinerary
module.exports = myCities
