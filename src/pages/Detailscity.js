
import { useParams } from "react-router-dom";
import React, {useEffect, useState} from 'react'
import  {getMyCities} from '../Apicalls'
import Underconstruction from '../components/Underconstruction'
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button'


const Detailscity = () => {

    window.scrollTo({top: 0, behavior: "smooth"})

    const {id} = useParams()
    const [specificCity , setspecificCity] = useState([])

    useEffect(()=>{
        getMyCities()
        .then(response => setspecificCity(response.data.response.allcities.filter(cities => cities._id === id)))
    },[]) //preguntar por que iria id adentro?


    return ( 
        <>
        <div>
            {specificCity.map(city => (
                <div key={city._id} >
                    <div>

                    <div className="hero-each-city  d-flex align-items-center"
                    style={{backgroundImage: `url('${process.env.PUBLIC_URL+"/assets/cities/"+ city.src}' )`}}>
                    <div className="container"> 
                        <div className="row"> 
                            <div className=" col-lg-7 mx-auto text-center">
                                <h1 className="ff-title-eachcity ">Welcome to {city.city} </h1>
                                
                            </div>
                        </div>
                    </div>
            </div>
                    
                    </div>

                </div>


                ))
            }
            
        </div>

        <Underconstruction/>

            <div className='mb-5 d-flex justify-content-center'> 

                <Link to="/cities">

                <Button variant='outline-dark' className='bg-button-more'>Back to cities</Button> 
            
                </Link>

            </div>
            




    </>

    );
}

export default Detailscity;