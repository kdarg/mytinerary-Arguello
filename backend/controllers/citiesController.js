const myCities = require("../models/modelcities");

const citiesController = {
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
};

module.exports = citiesController;
