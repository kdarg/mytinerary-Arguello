const myItineraries = require("../models/modelItineraries")

const itinerariesController = {

    //get all itineraries

    getAllItineraries: async (req, res) => {
        let all_itineraries;
        let error = null;
    
        try {
            all_itineraries = await myItineraries.find().populate("cityId");
        } catch (err) {
            error = err;
            console.log(error);
        }
        res.json({
            response: error ? "ERROR" :  all_itineraries,
            success: error ? false : true,
            error: error,
        });
        
        },

    //add new itinerary

        addItinerary:  (req, res) => {
            const newItinerary = new myItineraries({
                city:req.body.city,
                title:req.body.title,
                src:req.body.src,
                description:req.body.description,
                profilePicture:req.body.profilePicture,
                userName:req.body.userName,
                price:req.body.price,
                duration:req.body.duration,
                likes:req.body.likes,
                hashtags:req.body.hashtags,
                comments:req.body.comments,
                cityId:req.body.cityId
            })
            newItinerary.save()
            .then((response)=> res.json({success:true, note:'itinerary added', response: response}))
            .catch((error)=> res.json({success:false, response:error}))
        },

        // get one itinerary by id

        getItineraryById: async (req, res) => {
        await myItineraries.findOne({_id:req.params.id})
        .then((itinerary) => res.json({success:true, note:'itinerary by id', response: itinerary}))
        .catch((error) => res.json({success:false, response:error}))
        },

        // get itineraries by city 

        getItinerariesByCity: (req, res) => {
            myItineraries.find({ cityId: req.params.id }).populate("cityId")
            .then((itinerariesByCity) =>
            res.json({ success: true, response: itinerariesByCity }))
            .catch((err) => res.json({ success: false, response: err }))
        },

        //detele one itinerary 

    deleteItinerary :(req, res) =>{
        myItineraries.findOneAndDelete({_id:req.params.id})
        .then((itinerarydeleted) =>res.json({success:true, note:'itinerary deleted', response: itinerarydeleted }))
        .catch((error) => res.json({success:false, response: error}))
    },

    //edit one itinerary //id in params

    editItinerary: async (req, res) =>{
        await myItineraries.findOneAndUpdate({_id:req.params.id}, req.body, {new: true})
        .then((response) => res.json({success:true, note:'itinerary edited', response: response}))
        .catch((error) => res.json({success:false, response:error}))
    },


    //like and dislike

    likeItinerary:  async (req, res) => {

        const id = req.params.id

        const user = req.body.user

        let itineraries

        try{

            itineraries = await myItineraries.findOne({_id:id})

            //si itinerarios.likes incluye el id del usuario dentro del array (definido en el modelo), lo buscamos y lo actualizamos, le pulleamos el dato del user. (con $pull quitamos de la base de datos el like del usuario) sino, pusheamos el dato del user

            if(itineraries.likes.includes(user)){

                myItineraries.findOneAndUpdate(
                    { _id: id },
                    { $pull: { likes: user } },
                    { new: true }
                ).then (response => res.json({success: true, response: response.likes}))
                .catch(error => console.log(error) )

            }else{

                myItineraries.findOneAndUpdate(
                    { _id: id },
                    { $push: { likes: user } },
                    { new: true }
                ).then (response => res.json({success: true, response: response.likes}))
                .catch(error => console.log(error) )

            }

        } catch (err) {
            error = err
            res.json({success: false, response: error})
            
        }

    }

};

module.exports = itinerariesController;
