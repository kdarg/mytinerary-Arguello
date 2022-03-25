
import { useParams } from "react-router-dom";
import React, {useEffect, useState} from 'react'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'
import { connect } from "react-redux";
import citiesActions from "../redux/actions/citiesActions";
import itinerariesActions from "../redux/actions/itinerariesActions";
import Noitineraries from './Noitineraries'
import Swal from 'sweetalert2'
import Activity from './Activity'
import Comments from './Comments'
import InputComments from "./InputComments";

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

    //SEE MORE / SEE LESS BUTTON 
    const [buttonMore, setButtonMore] = useState(false)

    const actionButton = () => {
        setButtonMore(!buttonMore)
    }

    //LIKES & DISLIKES
    const [reload, setReload] = useState(false)
    
    async function likesOrDislikes(itineraryid) {
        await props.likeItinerary(itineraryid)
        props.getItinerariesByCityId(id) //se reinicia el itinerario sin necesidad de f5
        setReload(!reload)
    }
    
    // console.log(props.itinerary);
    console.log(props)

    async function needToLogIn(){
    
        const Toast = Swal.mixin({
            toast: true,
            position: "center-end",
            showConfirmButton: false,
            timer: 3000,
            background: "#FFF",
            iconColor: "rgb(238, 76, 103)",
            confirmButtonColor: "rgb(221, 46, 113)",
            timerProgressBar: true,
            
            didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
            },
        });

        Toast.fire({
            icon: "error",
            title: `You must be logged in to like this post!`,
        });
        
    }

console.log(props.itinerary._id)

    return ( 
        <>

{/* DYNAMIC ITINERARIES */}


                        <div key= {props.itinerary._id}>
                        <div  className="centerItinerariesCards">
                        <div  className="itinerariesCards">

                            <div className="centerTag"><span className="tag">{props.itinerary.title}</span></div>

                            <div className="user">
                                
                            <img src={process.env.PUBLIC_URL+"/assets/imgs/"+ props.itinerary.profilePicture} alt='user' className='user_img_size'/>
                                
                            <div className="userName"> › {props.itinerary.userName} ‹ </div>

                            </div>

                            <div className="itiDescription text-center">{props.itinerary.description}</div>

                            <div className="priceDuration">
                            <p className="itiPrice"><span className="itiUnderline">Price</span>: {"💵".repeat(parseInt(props.itinerary.price))}</p>
                            <p className="itiDuration"><span className="itiUnderline">Duration</span>: {"🕓" + props.itinerary.duration}</p>

                            </div>
        
                            {<div className="likes_pointer">
                            {props.user
                            ? 
                            (<div onClick={() => likesOrDislikes(props.itinerary._id)}>
                                {props.itinerary.likes.includes(props.user.id)?

                            <span style={{color: "red", fontSize:30 , backgroundColor:"white"}} className="material-icons">favorite</span>
                            :
                            <span style={{  fontSize:30 }}className="material-icons">favorite_border</span>}
                            </div>)
                            :
                            (<div   onClick={needToLogIn} style={{fontSize:30}}className="material-icons">favorite_border</div>)
                            
                            }

                        <p style={{color:"black ",fontSize:30 }} className='ooola'>{props.itinerary.likes.length}</p>
            
                            </div>}

                            <div className="centerHashtags">
                                {props.itinerary.hashtags.map((tag, key) => <p className="tagsColor" key={key}>{tag}</p>)}
                                </div>
                            

                            {!buttonMore && <div className="d-flex justify-content-center"><Button variant='outline-dark' className="bg-button-more" onClick={actionButton}> {buttonMore ? 'View less' : 'View More'}</Button></div>}

                            
                        {
                    buttonMore
                    &&
                    <div className="activityContainer">

                        <div className="uwu">
                            <Activity id={props.itinerary._id}/>
                            {props.itinerary.comments.map(comment => <Comments id={props.itinerary._id} comment={comment} getItinerariesByCityId={props.getItinerariesByCityId} /> )}
                            <InputComments itineraryId={props.itinerary._id} getItinerariesByCityId={props.getItinerariesByCityId}/>
                        </div>


                        {/* <Underconstruction buttonMore={buttonMore}  /> */}
                                                
                        <div className="d-flex justify-content-center"><Button variant='outline-dark' className="bg-button-more" onClick={actionButton}> {buttonMore ? 'View less' : 'View More'}</Button></div>
                    </div>
                }
                        </div>
                        </div>
                        </div>
                    
                </>
            )

            


        

}


const mapStateToProps = (state) => {
    return {
        cityById: state.citiesReducer.cityById,
        // itinerary: state.itinerariesReducer.itinerary,
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










