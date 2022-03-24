
import { useParams } from "react-router-dom";
import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import itinerariesActions from "../redux/actions/itinerariesActions";

const Likes = (props) => {

    console.log(props)
    
    const { id } = useParams()

    //LIKES & DISLIKES

    const [reload, setReload] = useState(false)
    const [itinerary, setItinerary] = useState()

    useEffect(() => {
        props.getItinerariesByCityId(id)
        .then(response => setItinerary(response.data.response.itinerary))
    }, [reload])

    async function likesOrDislikes() {
        await props.likeItinerary(itinerary._id)
        
        setReload(!reload)
    }
    //console.log(itinerary)


    return ( 
        <>

        <div>
        <div className="likeDislike">

{props.user ?
  (<button onClick={likesOrDislikes}>{itinerary?.likes.includes(props.user.id) ?
    <span style={{ color: "red", fontSize:30 }} class="material-icons">favorite</span> :
    <span style={{  fontSize:30 }}class="material-icons">favorite_border</span>}</button>)

  : (<span style={{  fontSize:30 }} class="material-icons">favorite_border</span>)}

<h3 style={{  color:"black ",fontSize:30 }}>{itinerary?.likes.length}</h3>
</div>





        </div>

    </>

    );
}

const mapStateToProps = (state) => {
    return {
        //cityById: state.citiesReducer.cityById,
        itinerary: state.itinerariesReducer.itinerary,
        user: state.userReducer.user,

    }
}

const mapDispatchToProps = {
    //getOneCity: citiesActions.getOneCity,
    getItinerariesByCityId: itinerariesActions.getItinerariesByCityId,
    likeItinerary: itinerariesActions.likeItinerary,

}

export default connect(mapStateToProps, mapDispatchToProps)(Likes);










