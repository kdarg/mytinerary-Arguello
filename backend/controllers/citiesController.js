const myCities = require("../models/modelcities");

const citiesController = {

    // GET ALL CITIES

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
        response: error ? "ERROR" :  allcities,
        success: error ? false : true,
        error: error,
    });
    
    },

    // ADD NEW CITY 

    addNewCity:  (req, res) => {
        const newCity = new myCities({
            country:req.body.country,
            city:req.body.city,
            src:req.body.src,
            description:req.body.description
        })
        newCity.save()
        .then((response)=> res.json({success:true, note:'city added', response: response}))
        .catch((error)=> res.json({success:false, response:error}))
    },

    // GET ONE CITY BY ID

    getCityById: async (req, res) => {
        await myCities.findOne({_id:req.params.id})
        .then((city) => res.json({success:true, response: city}))
        .catch((error) => res.json({success:false, response:error}))
    },
    
     // DELETE ONE CITY  

    deleteCity :(req, res) =>{
        myCities.findOneAndDelete({_id:req.params.id})
        .then((deteledcity) =>res.json({success:true, note:'city deleted', response: deteledcity }))
        .catch((error) => res.json({success:false, response: error}))
    },

    // EDIT ONE CITY - ID IN PARAMS

    editCity: async (req, res) =>{
        await myCities.findOneAndUpdate({_id:req.params.id}, req.body, {new: true})
        .then((response) => res.json({success:true, note:'edited city', response: response}))
        .catch((error) => res.json({success:false, response:error}))
    
    }

    // EDIT ONE CITY -  ID IN BODY - WORKS :D 

    // editCity: async (req, res) =>{
    //     await myCities.findOneAndUpdate({_id:req.body.id}, req.body, {new: true})
    //     .then((response) => res.json({success:true, note:'edited city', response: response}))
    //     .catch((error) => res.json({success:false, response:error}))
    // },

};

module.exports = citiesController;
