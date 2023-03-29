const myItineraries = require("../models/modelItineraries")

const itinerariesController = {

    //GET ALL ITINERARIES

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

    //ADD NEW ITINERARY 

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

    // GET ONE ITINERARY BY ID

        getItineraryById: async (req, res) => {
        await myItineraries.findOne({_id:req.params.id})
        .then((itinerary) => res.json({success:true, note:'itinerary by id', response: itinerary}))
        .catch((error) => res.json({success:false, response:error}))
        },

    // GET ITINERARIES BY CITY 

        getItinerariesByCity: (req, res) => {
            myItineraries.find({ cityId: req.params.id }).populate("cityId").populate("comments.userID", {firstname:1, lastname:1, urlimage:1})
            .then((itinerariesByCity) =>
            res.json({ success: true, response: itinerariesByCity }))
            .catch((err) => res.json({ success: false, response: err }))
        },

    // DELETE ONE ITINERARY 

    deleteItinerary :(req, res) =>{
        myItineraries.findOneAndDelete({_id:req.params.id})
        .then((itinerarydeleted) =>res.json({success:true, note:'itinerary deleted', response: itinerarydeleted }))
        .catch((error) => res.json({success:false, response: error}))
    },

    // EDIT ONE ITINERARY - ID IN PARAMS 

    editItinerary: async (req, res) =>{
        await myItineraries.findOneAndUpdate({_id:req.params.id}, req.body, {new: true})
        .then((response) => res.json({success:true, note:'itinerary edited', response: response}))
        .catch((error) => res.json({success:false, response:error}))
    },

    //LIKE AND DISLIKE 

    likeItinerary: async (req, res) => {

        const id = req.params.id // Itinrerary ID that we want to like or dislike from axios

        const user = req.user.id // User ID that comes from Passport

        await myItineraries.findOne({_id:id})
        .then( (itinerary) => {

            if(itinerary.likes.includes(user)){

                myItineraries.findByIdAndUpdate(
                    { _id:id },
                    { $pull: { likes: user } },
                    { new: true } 
                    ).then ( response => res.json({ success: true, response: response.likes }))
                    .catch( error => console.log(error) )
            }else{

                myItineraries.findOneAndUpdate(
                { _id: id },
                { $push: { likes: user } },
                { new: true }
                ).then (response => res.json({ success: true, response: response.likes }))
                .catch(error => console.log(error) )
            }

        }).catch( (error) => res.json( {success: false, response: error }))

    },

    // ADD NEW COMMENT

    addComment: async (req, res) => {
        const {itinerary,comment} = req.body
        const user = req.user._id

        try {
            const newComment = await myItineraries.findOneAndUpdate({_id:itinerary}, {$push: {comments: {comment: comment, userID: user}}}, {new: true}).populate("comments.userID", {firstname:1, lastname:1, urlimage:1})
            res.json({ success: true, response:newComment, message:"Thanks for your comment!" })

        }
        catch (error) {
            console.log(error)
            res.json({ success: false, message: "Something went wrong, please try again in a few minutes.", error:error.message })
        }

    },

    // EDIT COMMENT

    editComment: async (req, res) => {
        const {comment} = req.body
        const user = req.user._id

        try {
            const editedComment = await myItineraries.findOneAndUpdate({"comments._id":req.params.id}, {$set: {"comments.$.comment": comment}}, {new: true})

            res.json({ success: true, response:editedComment, message:"Comment modified!" })

        }
        catch (error) {
            console.log(error)
            res.json({ success: true, message: "Something went wrong, please try again in a few minutes." })
        }

    },

    // DELETE COMMENT

    deleteComment: async (req, res) => {
        const id = req.params.id
        const user = req.user._id
        try {
            const deleteComment = await myItineraries.findOneAndUpdate({"comments._id":id}, {$pull: {comments: {_id: id}}}, {new: true})

            res.json({ success: true, response:deleteComment, message: "Comment deleted!" })

        }
        catch (error) {
            console.log(error)
            res.json({ success: false, message: "Something went wrong, please try again in a few minutes." })
        }

    },

};

module.exports = itinerariesController;
