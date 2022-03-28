import { useParams } from "react-router-dom";
import React, {useEffect} from 'react'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import { connect } from "react-redux";
import citiesActions from "../redux/actions/citiesActions";
import itinerariesActions from "../redux/actions/itinerariesActions";
import Noitineraries from '../components/Noitineraries'
import Itinerary from "../components/Itinerary";

const Detailscity = (props) => {

    // SCROLL TO TOP
    //window.scrollTo({top: 0, behavior: "smooth"})

    //ITINERARIES BY CITY ID

    const {id} = useParams()

    useEffect(()=>{
        props.getOneCity(id)
        props.getItinerariesByCityId(id)
        window.scrollTo({top: 0, behavior: "smooth"})
    },[]) 

    //DESTRUCTURING 
    const {cityById} = props

console.log(props.itinerary)

    return ( 
        <>

{/* WELCOME TO CHOSEN CITY */}

        <div>
            {props.cityById._id &&  (
                <div key={cityById._id} >
                    <div>
                    <div className="hero-each-city  d-flex align-items-center"
                    style={{backgroundImage: `url('${process.env.PUBLIC_URL+"/assets/cities/"+ cityById.src}' )`}}>
                        <div className="container"> 
                            <div className="row"> 
                                <div className=" col-lg-7 mx-auto text-center">
                                    <h1 className="ff-title-eachcity ">Welcome to {cityById.city} </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                )
            }
            
        </div>

{/* ITINERARIES LIL HEADER */}

        <div className="popular_mytineraries"><h3 className="popular_fs">Itineraries</h3></div>

{/* DYNAMIC ITINERARIES */}

        {props.itinerary.length ?
            (
                <>
                    {props.itinerary.map(itinerary => 

                    <Itinerary itinerary={itinerary} key={itinerary.title}/>
                    )}
                </>
            )
            : <Noitineraries/>

        }

{/* BUTTON BACK TO CITIES */}

            <div className='mb-5 d-flex justify-content-center'> 
                <Link to="/cities">
                <Button variant='outline-dark' className='bg-button-more'>Back to cities</Button> 
                </Link>
            </div>
    </>

    );
}

const mapStateToProps = (state) => {
    return {
        cityById: state.citiesReducer.cityById,
        itinerary: state.itinerariesReducer.itinerary,
        user: state.userReducer.user
    }
}

const mapDispatchToProps = {
    getOneCity: citiesActions.getOneCity,
    getItinerariesByCityId: itinerariesActions.getItinerariesByCityId,
    likeItinerary: itinerariesActions.likeItinerary,
    addComment: itinerariesActions.addComment,
    editComment: itinerariesActions.editComment,
    deleteComment: itinerariesActions.deleteComment
}

export default connect(mapStateToProps, mapDispatchToProps)(Detailscity);