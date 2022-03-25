import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";
import React, {useEffect, useState} from 'react';
import Noresults from './Noresults';
import { connect } from "react-redux";
import citiesActions from "../redux/actions/citiesActions";

const Cardscities = (props) => {

    useEffect(() => {
        props.getCities() 
    }, [])

    const [] = useState()

    const inputsearch = (e) => {
        props.filterCities(e.target.value)
    }

    return ( 
        <>
        
{/* MINI PRESENTATION */}

        <div className="popular_mytineraries"><h3 className="popular_fs">Adventures ahead!</h3></div>

{/* SEARCH */}

        <div className=" d-flex justify-content-center mt-3 mb-3"> 
        <input type='text' placeholder='Search destination..' className='input-search' onChange={inputsearch}/> 
        </div>

{/* CARDS */}

        <div  className="d-flex flex-wrap justify-content-center align-items-center">

        {props.cityfiltered.length !== 0 ? (props.cityfiltered.map((city) => (

        <div key= {city._id} className="maincontainer">

        <div className="thecard">

        <div className="thefront"> 
            
            <div className=" d-flex flex-column justify-content-center align-items-center polaroid-two ">
            <img src={process.env.PUBLIC_URL+"/assets/cities/"+ city.src} alt='City' className='image_card_size d-flex'/>

            <div className='fw-bold p-4 f-size-cardscities'>
                <p>{city.city} - {city.country}</p>
            </div>

            </div>
        
        </div>

        <div className="theback d-flex flex-column justify-content-center align-items-center"> 
            
            <h1 className="text-center fs-4">{city.city} - {city.country}</h1><p>{city.description}</p>

        <Link to={`/city/${city._id}`}><Button variant='outline-dark' className='bg-button-more'>See more</Button></Link>
        </div>

        </div>

        </div>

        ))): <Noresults/> }

        </div> 

        </>
    );

}

    const mapStateToProps = state => {
        return {
            cityfiltered: state.citiesReducer.filterCities 
        }
}

    const mapDispatchToProps = {
        getCities: citiesActions.getCities,
        filterCities: citiesActions.filterCities
}

export default connect(mapStateToProps, mapDispatchToProps)(Cardscities);
