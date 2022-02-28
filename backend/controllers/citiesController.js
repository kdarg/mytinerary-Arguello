const myCities = require("../models/modelcities");

const citiesController = {

    //get all cities

    getCities: async (req, res) => {
    let allcities;
    let error = null;

    try {
        allcities = await myCities.find();
    } catch (err) {
        error = err;
        console.log(error);
    }
    res.json({
        response: error ? "ERROR" : { allcities },
        success: error ? false : true,
        error: error,
    });
    
    },

    //add new city

    addNewCity:  (req, res) => {
        const newCity = new myCities({
            country:req.body.country,
            city:req.body.city,
            src:req.body.src,
            description:req.body.description
        })
        newCity.save()
        .then((response)=> res.json({success:true, note:'added city', response: response}))
        .catch((error)=> res.json({success:false, response:error}))
    },

    // get one city by id

    getCityById: async (req, res) => {
        await myCities.findOne({_id:req.params.id})
        .then((city) => res.json({success:true, response: city}))
        .catch((error) => res.json({success:false, response:error}))
    },
    
     //detele one city 

    deleteCity :(req, res) =>{
        myCities.findOneAndDelete({_id:req.params.id})
        .then((deteledcity) =>res.json({success:true, note:'deleted city', response: deteledcity }))
        .catch((error) => res.json({success:false, response: error}))
    },

    //modify one city

    editCity:(req, res) =>{
        myCities.findOneAndUpdate({_id:req.body.id}, {...req.body}, {new: true})
        .then((editedcity) => res.json({success:true, note:'edited city', response: editedcity}))
        .catch((error) => res.json({success:false, response:error}))
    }

};

module.exports = citiesController;
