const mongoose = require("mongoose")

const itinerarySchema = new mongoose.Schema({
    city: { type: String, required: true },
    title: { type: String, required: true },
    src: { type: String },
    description: { type: String, required: true },
    profilePicture: { type: String, required: true },
    userName: { type: String, required: true },
    price: { type: Number, required: true, min: 1, max: 5 },
    duration: { type: String, required: true },
    likes: { type: Number , default:0 },
    hashtags: [{ type: String, required: true }],
    comments: [],
    cityId:{type: mongoose.Types.ObjectId, ref:'cities'}
})

const myItineraries = mongoose.model("itineraries", itinerarySchema) 

module.exports = myItineraries
