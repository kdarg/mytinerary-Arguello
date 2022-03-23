const Activities = require('../models/modelActivities')

const activitiesController = {

    getActivities: (req, res) => {
        Activities.find().populate('itinerary')
        .then((activities) => res.json({ success:true, note:'all activities', response: activities }))
        .catch(err => console.log(err))
    },
    addActivity: (req, res) => {
        const {title, src, itinerary} = req.body 
        new Activities({title, src, itinerary}).save()
        .then(() => res.json({success:true, note:'activity added'}))
        .catch(err => console.log(err))
    },
    getActivity: (req, res) => {
        Activities.findOne({_id: req.params.id}).populate('itinerary')
        .then((activity) => res.json({success:true, note:'activity', response: activity}))
        .catch(err => console.log(err))
    },
    deleteActivity: (req, res) => {
        Activities.findOneAndDelete({_id: req.params.id})
        .then(() => res.json({ success:true, note:'activity deleted' }))
        .catch(err => console.log(err))
    },
    editActivity: (req, res) => {
        Activities.findOneAndUpdate({_id: req.params.id}, {...req.body})
        .then(()=> res.json({success:true, note:'activity edited'}))
        .catch(err => console.log(err))
    }, 
    getActivityByItinterary: (req, res) => {
        Activities.find({itinerary: req.params.id}).populate('itinerary')
        .then(activities => res.json({success:true, note:'itinerariy activities', response:activities}))
        .catch(err => console.log(err))
    }

}

module.exports = activitiesController;