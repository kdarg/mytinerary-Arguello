
import { useParams } from "react-router-dom";
import React, {useEffect, useState} from 'react'
import  {getMyCities} from '../Apicalls'


const Detailscity = () => {

    const {id} = useParams()
    const [specificCity , setspecificCity] = useState([])

    useEffect(()=>{
        getMyCities()
        
        .then(response => setspecificCity(response.data.response.allcities.filter(cities => cities._id === id)))
    },[]) //preguntar por que iria id adentro?


    return ( 
        <>
        <div>
            {specificCity.map(everyCity => (
                <article key={everyCity._id} >
                    <div>
                        <h2 >{everyCity.city}</h2>
                        <h5 >Country: {everyCity.country}</h5>
                    </div>

                </article>
                ))
            }
        </div>
    </>
     );
}
 
export default Detailscity;