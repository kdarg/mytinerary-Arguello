const mongoose = require('mongoose')
const {Schema} = mongoose

const activitiesSchema = new Schema({
    title:{type:String, required:true},
    src:{type:String, required:true},
    itinerary:{type: mongoose.Types.ObjectId, ref:"itineraries", required:true}
})

const Activities = mongoose.model("activities", activitiesSchema);

module.exports = Activities;