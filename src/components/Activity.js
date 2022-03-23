
import { connect } from 'react-redux'
import itinerariesActions from "../redux/actions/itinerariesActions"
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

const Activity = (props) => {

    console.log(props)
    
    
    const [activities, setActivities] = useState([])

    // const [nombre, setNombre] = useState('')
    // console.log(nombre)

    useEffect( () => {
        props.getActivityByItinterary(props.id) 
        .then(res => setActivities(res.response))
        //setNombre('karen')
    }, [])
    
    // console.log(nombre)

    return (

        <div className="">
            <p>Activities</p>
            {activities.map(activity => {
                return ( 
                    <div className="d-flex flex-column justify-content-center align-items-center">
                    <div key={activity._id}>
                            <div/>
                            <img className="col-12" src={process.env.PUBLIC_URL+"/assets/imgs/"+ activity.src} alt='City' className='image_card_size d-flex'/>

                            <p>{activity.title}</p>

                    </div>
                    </div>
                )})}       
        </div>
    )
}
const mapDispatchToProps = {
    getActivityByItinterary: itinerariesActions.getActivityByItinterary
}

export default connect(null, mapDispatchToProps)(Activity)