
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
import Activity from '../components/Activity'
import Likes from '../components/Likes'


const Detailscity = (props) => {

    // SCROLL TO TOP
    //window.scrollTo({top: 0, behavior: "smooth"}) por que con cada click en boton sube? lol

    //ITINERARIES BY CITY ID

    const {id} = useParams()

    useEffect(()=>{
        props.getOneCity(id)
        props.getItinerariesByCityId(id)
    },[]) 
    //console.log(props)
    //SEE MORE / SEE LESS BUTTON 
    const [buttonMore, setButtonMore] = useState(false)

    const actionButton = () => {
        setButtonMore(!buttonMore)
    }

    //DESTRUCTURING 
    const {cityById} = props

    //LIKES & DISLIKES

    // const [reload, setReload] = useState(false)
    // const [itinerary, setItinerary] = useState()

    // useEffect(() => {
    //     props.getItinerariesByCityId(id)
    //       .then(response => setItinerary(response.data.response.itinerary))
    //   }, [reload])

    // async function likesOrDislikes() {
    //     await props.likeItinerary(itinerary._id)
        
    //     setReload(!reload)
    // }
    // console.log(itinerary)


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

{/* <Likes/> */}

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

                        <div className="uwu">
                            <Activity id={itinerary._id}/>
                        </div>


                        {/* <Underconstruction buttonMore={buttonMore}  /> */}
                                                
                        <div className="d-flex justify-content-center"><Button variant='outline-dark' className="bg-button-more" onClick={actionButton}> {buttonMore ? 'View less' : 'View More'}</Button></div>
                    </div>
                }
                        </div>
                        </div>
                        </div>
                    )}
                </>
            )

            :
                <Noitineraries/>

        

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
        // user: state.userReducer.user,
        // token: state.userReducer.token,
        // _id: state.userReducer._id,
    }
}

const mapDispatchToProps = {
    getOneCity: citiesActions.getOneCity,
    getItinerariesByCityId: itinerariesActions.getItinerariesByCityId,
    likeItinerary: itinerariesActions.likeItinerary,

}

export default connect(mapStateToProps, mapDispatchToProps)(Detailscity);










