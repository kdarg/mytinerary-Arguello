
import { useParams } from "react-router-dom";
import React, {useEffect, useState} from 'react'
import  {getMyCities} from '../Apicalls'
import Underconstruction from '../components/Underconstruction'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import { connect } from "react-redux";
import citiesActions from "../redux/actions/citiesActions";
import itinerariesActions from "../redux/actions/itinerariesActions";
import Noitineraries from '../components/Noitineraries'
import {FaHeart, FaRegHeart} from 'react-icons/fa'
import generalToast from "../components/Toast"


const Detailscity = (props) => {

    console.log("🚀 ~ file: Detailscity.js ~ line 23 ~ Detailscity ~ props", props)

    // SCROLL TO TOP
    //window.scrollTo({top: 0, behavior: "smooth"}) por que con cada click en boton sube? lol

    //ITINERARIES BY CITY ID

    const {id} = useParams()

    useEffect(()=>{
        props.getOneCity(id)
        props.getItinerariesByCityId(id)
    },[]) 

    //SEE MORE / SEE LESS BUTTON 
    const [buttonMore, setButtonMore] = useState(false)

    const actionButton = () => {
        setButtonMore(!buttonMore)
    }

    //DESTRUCTURING 
    const {cityById} = props


//FIRST TRY JIJI

    //LIKES AND DISLIKES
    //DESTRUCTURING
    
     const {likes, _id} = props.itinerary
     console.log("🚀 ~ file: Detailscity.js ~ line 49 ~ Detailscity ~ props", props)
     
     console.log("🚀 ~ file: Detailscity.js ~ line 48 ~ Detailscity ~ _id", _id)
     console.log("🚀 ~ file: Detailscity.js ~ line 48 ~ Detailscity ~ likes", likes)

    const [likeIcon, setLikeIcon] = useState(true)
    const [itinerariesLikes, setItinerariesLikes] = useState(likes)
    const liked= itinerariesLikes.includes(props.itinerary._id) ? <FaHeart className="heartIconRed"/> : <FaRegHeart className="heartIcon"/>

    
    const likeItinerary = async ()=>{
    setLikeIcon(false)
    if(!props.itinerary.token){
        generalToast('error', 'You must be logged in to like this post')
    }else{
        let response = await props.itinerary.likeItinerary(_id, props.itinerary.token)
        setItinerariesLikes(response.data.response)
    }
    setLikeIcon(true)
    }




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
                        <div key= {itinerary._id}>
                        <div  className="centerItinerariesCards">
                        <div  className="itinerariesCards bg-light">

                            <div className="centerTag"><span className="tag">{itinerary.title}</span></div>

                            <div className="user">
                                
                            <img src={process.env.PUBLIC_URL+"/assets/imgs/"+ itinerary.profilePicture} alt='user' className='user_img_size'/>
                                
                            <div className="userName"> › {itinerary.userName} ‹ </div>
                            </div>

                            <div className="itiDescription text-center">{itinerary.description}</div>

                            <div className="priceDuration">
                            <p className="itiPrice"><span className="itiUnderline">Price</span>: {"💵".repeat(parseInt(itinerary.price))}</p>
                            <p className="itiDuration"><span className="itiUnderline">Duration</span>: {"🕓" + itinerary.duration}</p>


                            <div onClick={(likeIcon ? likeItinerary : null )} className="likes">
                            {liked}
                           <p>{itinerariesLikes.length}</p>
                        </div>

                            <p className="itiLikes">{itinerary.likes + "💖"}</p>


                            </div>
                            




                            <div className="centerHashtags">
                                {itinerary.hashtags.map((tag, key) => <p className="tagsColor" key={key}>{tag}</p>)}
                                </div>
                            

                            {!buttonMore && <div className="d-flex justify-content-center"><Button variant='outline-dark' className="bg-button-more" onClick={actionButton}> {buttonMore ? 'View less' : 'View More'}</Button></div>}

                        {
                    buttonMore
                    &&
                    <div className="activityContainer">
                        <Underconstruction buttonMore={buttonMore}  />
                        
                        <div className="d-flex justify-content-center"><Button variant='outline-dark' className="bg-button-more" onClick={actionButton}> {buttonMore ? 'View less' : 'View More'}</Button></div>
                    </div>
                }
                        </div>
                        </div>
                        </div>
                    )}
                </>
            )

            :<Noitineraries/>

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
        user: state.userReducer.user,
        token: state.userReducer.token,
        _id: state.userReducer._id,
    }
}

const mapDispatchToProps = {
    getOneCity: citiesActions.getOneCity,
    getItinerariesByCityId: itinerariesActions.getItinerariesByCityId,
    likeItinerary: itinerariesActions.likeItinerary,

}

export default connect(mapStateToProps, mapDispatchToProps)(Detailscity);










