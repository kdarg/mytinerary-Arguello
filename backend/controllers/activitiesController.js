const Activities = require('../models/modelActivities')

const activitiesController = {

    // GET ALL ACTIVITIES

    getActivities: (req, res) => {
        Activities.find().populate('itinerary')
        .then((activities) => res.json({ success:true, note:'all activities', response: activities }))
        .catch(err => console.log(err))
    },

    // ADD ACTIVITY

    addActivity: (req, res) => {
        const {title, src, itinerary} = req.body 
        new Activities({title, src, itinerary}).save()
        .then(() => res.json({success:true, note:'activity added'}))
        .catch(err => console.log(err))
    },

    // GET ONE ACTIVITY 

    getActivity: (req, res) => {
        Activities.findOne({_id: req.params.id}).populate('itinerary')
        .then((activity) => res.json({success:true, note:'activity by id', response: activity}))
        .catch(err => console.log(err))
    },

    // DELETE ACTIVITY

    deleteActivity: (req, res) => {
        Activities.findOneAndDelete({_id: req.params.id})
        .then(() => res.json({ success:true, note:'activity deleted' }))
        .catch(err => console.log(err))
    },

    // EDIT ACTIVITY

    editActivity: (req, res) => {
        Activities.findOneAndUpdate({_id: req.params.id}, {...req.body})
        .then(()=> res.json({success:true, note:'activity edited'}))
        .catch(err => console.log(err))
    }, 

    // GET ACTIVITY BY ITINERARY

    getActivityByItinterary: (req, res) => {
        Activities.find({itinerary: req.params.id}).populate('itinerary')
        .then(activities => res.json({success:true, note:'activity by itinerary', response:activities}))
        .catch(err => console.log(err))
    }

}

module.exports = activitiesController;