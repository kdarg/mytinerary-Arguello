
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


const Detailscity = (props) => {

    // SCROLL TO TOP
    //window.scrollTo({top: 0, behavior: "smooth"})

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

        {props.itinerary.length ? //<h1>si hay {props.itinerary.length} itinerarios</h1>
            (
                <>
                
                    {props.itinerary.map(itinerary => 
                        <div key= {itinerary._id}>
                        <div  className="centerItinerariesCards">
                        <div  className="itinerariesCards bg-light">

                            <div className="centerTag"><span className="tag">{itinerary.title}</span></div>

                            <div className="user">
                                
                            <img src={process.env.PUBLIC_URL+"/assets/imgs/"+ itinerary.profilePicture} alt='user' className='user_img_size'/>
                                
                            <div className="userName">{itinerary.userName}</div>
                            </div>

                            <div className="itiDescription text-center">{itinerary.description}</div>

                            <div className="priceDuration">
                            <p className="itiPrice"><span className="itiUnderline">Price</span>: {"💵".repeat(parseInt(itinerary.price))}</p>
                            <p className="itiDuration"><span className="itiUnderline">Duration</span>: {"🕓" + itinerary.duration}</p>
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

const mapStateToProps = state => {
    return {
        //cities: state.citiesReducer.getCities, solo trae todo pero no filtra
        cityById: state.citiesReducer.cityById,
        itinerary: state.itinerariesReducer.itinerary
    }
}

const mapDispatchToProps = {
    getOneCity: citiesActions.getOneCity,
    getItinerariesByCityId: itinerariesActions.getItinerariesByCityId
}

export default connect(mapStateToProps, mapDispatchToProps)(Detailscity);







// import { useParams } from "react-router-dom";
// import React, {useEffect, useState} from 'react'
// import  {getMyCities} from '../Apicalls'
// import Underconstruction from '../components/Underconstruction'
// import { Link } from "react-router-dom";
// import Button from 'react-bootstrap/Button'
// import { connect } from "react-redux";
// import citiesActions from "../redux/actions/citiesActions";


// const Detailscity = () => {

//     window.scrollTo({top: 0, behavior: "smooth"})

//     const {id} = useParams()
//     const [specificCity , setspecificCity] = useState([])

//     useEffect(()=>{
//         getMyCities()
//         .then(response => setspecificCity(response.data.response.allcities.filter(cities => cities._id === id)))
//     },[]) //preguntar por que iria id adentro?


//     return ( 
//         <>
//         <div>
//             {specificCity.map(city => (
//                 <div key={city._id} >
//                     <div>

//                     <div className="hero-each-city  d-flex align-items-center"
//                     style={{backgroundImage: `url('${process.env.PUBLIC_URL+"/assets/cities/"+ city.src}' )`}}>
//                     <div className="container"> 
//                         <div className="row"> 
//                             <div className=" col-lg-7 mx-auto text-center">
//                                 <h1 className="ff-title-eachcity ">Welcome to {city.city} </h1>
                                
//                             </div>
//                         </div>
//                     </div>
//             </div>
                    
//                     </div>

//                 </div>


//                 ))
//             }
            
//         </div>

//         <Underconstruction/>

//             <div className='mb-5 d-flex justify-content-center'> 

//                 <Link to="/cities">

//                 <Button variant='outline-dark' className='bg-button-more'>Back to cities</Button> 
            
//                 </Link>

//             </div>
            




//     </>

//     );
// }

// export default Detailscity;








