
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

    window.scrollTo({top: 0, behavior: "smooth"})

    const {id} = useParams()
    //const [specificCity , setspecificCity] = useState([])

console.log(props)

    useEffect(()=>{
        props.getOneCity(id)
        props.getItinerariesByCityId(id)
        
    },[]) 

    console.log(props.cityById)
    const {cityById} = props

    console.log(props.itinerary)

    return ( 
        <>
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

{props.itinerary.length ? //<h1>si hay {props.itinerary.length} itinerarios</h1>

(
    <>
    {props.itinerary.map(itinerary => 

        <p>{itinerary.userName}</p>

    )}
    </>
)

:<Noitineraries/> }

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








