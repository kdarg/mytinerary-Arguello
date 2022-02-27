import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import Noresults from './Noresults';

const Cardscities = () => {

    const [cities, setCities] = useState([])
    const [allMyCities, setAllMyCities] = useState([])
    const [search, setSearch] = useState('')

    const petitionGet = async () => {
    await axios
        .get(`http://localhost:4000/api/allcities`)
        .then((response) => {
            setCities(response.data.response.allcities);
            setAllMyCities(response.data.response.allcities);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const searching = (event) => {
    setSearch(event.target.value);
    searchFilter(event.target.value);
    
    };

    const searchFilter = (userSearching) => {
    let userSearch = allMyCities.filter((info) => {
        if (
            info.city
                .toString()
                .toLowerCase()
                .startsWith(userSearching.toLowerCase().trim())
                
        ) {

            return info;

        }else{

            return //console.log('search doesnt exist') 

        }
     
    });

    setCities(userSearch);

    };

    useEffect(() => {

    petitionGet();

    }, []);

    return ( 
        <>

{/* SEARCH? */}

        <div className="d-flex justify-content-center mt-3 mb-3"> 
        <input type='text' placeholder='Search destination..' className='input-search' value={search} onChange={searching}/> 
        </div>

{/* CARDS */}

        <div  className="d-flex flex-wrap justify-content-center align-items-center">

        {cities.length !== 0 ? (cities.map((city) => (

        <div key= {city._id} className="maincontainer">

        <div className="thecard">

        <div className="thefront"> 
            
            <div className=" d-flex flex-column justify-content-center align-items-center polaroid-two ">
            <img src={city.src} alt='City' className='image_card_size d-flex'/>

            <div className='fw-bold p-4'>
                <p>{city.city} - {city.country}</p>
            </div>

            </div>
        
        </div>

        <div className="theback d-flex flex-column justify-content-center align-items-center"> 
            
            <h1 className="text-center fs-4">{city.city} - {city.country}</h1><p>{city.description}</p>

        <Link to='/const'><Button variant='outline-dark' className='bg-button-more'>See more</Button></Link>
        </div>

        </div>


        </div>

        ))): <Noresults/> }

        </div> 

        </>
    );
}

export default Cardscities;