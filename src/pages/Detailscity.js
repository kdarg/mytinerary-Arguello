
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
import Swal from 'sweetalert2'
import Activity from '../components/Activity'
import Comments from '../components/Comments'
import InputComments from "../components/InputComments";
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

    //SEE MORE / SEE LESS BUTTON 
    const [buttonMore, setButtonMore] = useState(false)

    const actionButton = () => {
        setButtonMore(!buttonMore)
    }

    //DESTRUCTURING 
    const {cityById} = props

    //LIKES & DISLIKES
    const [reload, setReload] = useState(false)
    
    async function likesOrDislikes(itineraryid) {
        await props.likeItinerary(itineraryid)
        props.getItinerariesByCityId(id) //se reinicia el itinerario sin necesidad de f5
        setReload(!reload)
    }
    
    // console.log(props.itinerary);
    // console.log(props.user)

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

    //COMMENTS

    const [inputText, setInputText] = useState()
    const [modify, setModify] = useState()

    async function allComents(event) {

        const commentData = {
          itinerary: props._id,
          comment: inputText,
        }
        await props.addComment(commentData)
         
    
      }
    
      async function modifyComments(event) {
        const commentData = {
          commentID: event.target.id,
          comment: modify,
        }
        await props.editComment(commentData)
        
    
      }
      async function deleteComments(event) {
        await props.deleteComment(event.target.id)
        
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
                {/* {props.user?<h2>Hola</h2>:<h2>Chau</h2>} */}
                    {props.itinerary.map(itinerary => 

                    <Itinerary itinerary={itinerary}/>
                //         <div key= {itinerary._id}>
                //         <div  className="centerItinerariesCards">
                //         <div  className="itinerariesCards">

                //             <div className="centerTag"><span className="tag">{itinerary.title}</span></div>

                //             <div className="user">
                                
                //             <img src={process.env.PUBLIC_URL+"/assets/imgs/"+ itinerary.profilePicture} alt='user' className='user_img_size'/>
                                
                //             <div className="userName"> › {itinerary.userName} ‹ </div>

                //             </div>

                //             <div className="itiDescription text-center">{itinerary.description}</div>

                //             <div className="priceDuration">
                //             <p className="itiPrice"><span className="itiUnderline">Price</span>: {"💵".repeat(parseInt(itinerary.price))}</p>
                //             <p className="itiDuration"><span className="itiUnderline">Duration</span>: {"🕓" + itinerary.duration}</p>

                //             </div>
        
                //             {<div className="likes_pointer">
                //             {props.user
                //             ? 
                //             (<div onClick={() => likesOrDislikes(itinerary._id)}>
                //                 {itinerary.likes.includes(props.user.id)?

                //             <span style={{color: "red", fontSize:30 , backgroundColor:"white"}} className="material-icons">favorite</span>
                //             :
                //             <span style={{  fontSize:30 }}className="material-icons">favorite_border</span>}
                //             </div>)
                //             :
                //             (<div   onClick={needToLogIn} style={{fontSize:30}}className="material-icons">favorite_border</div>)
                            
                //             }

                //         <p style={{color:"black ",fontSize:30 }} className='ooola'>{itinerary?.likes.length}</p>
            
                //             </div>}

                //             <div className="centerHashtags">
                //                 {itinerary.hashtags.map((tag, key) => <p className="tagsColor" key={key}>{tag}</p>)}
                //                 </div>
                            

                //             {!buttonMore && <div className="d-flex justify-content-center"><Button variant='outline-dark' className="bg-button-more" onClick={actionButton}> {buttonMore ? 'View less' : 'View More'}</Button></div>}

                            
                //         {
                //     buttonMore
                //     &&
                //     <div className="activityContainer">

                //         <div className="uwu">
                //             <Activity id={itinerary._id}/>
                //             {itinerary.comments.map(comment => <Comments id={itinerary._id} comment={comment} /> )}
                //             <InputComments itineraryId={itinerary._id} getItinerariesByCityId={props.getItinerariesByCityId}/>
                //         </div>


                //         {/* <Underconstruction buttonMore={buttonMore}  /> */}
                                                
                //         <div className="d-flex justify-content-center"><Button variant='outline-dark' className="bg-button-more" onClick={actionButton}> {buttonMore ? 'View less' : 'View More'}</Button></div>
                //     </div>
                // }
                //         </div>
                //         </div>
                //         </div>
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










