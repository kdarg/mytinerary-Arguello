
import { connect } from 'react-redux'
import itinerariesActions from "../redux/actions/itinerariesActions"
import { useEffect, useState } from 'react'

const Activity = (props) => {

    //console.log(props)
    
    
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
        <>
        <div className=" ">
        <div className="centerTag"><span className="tag_act mb-4">Activities</span></div>

        <div className='activities_box'>


            {activities.map(activity => {
                return ( 
                    <div key={activity._id} className=" ">
                    <div className="uwu">
                    
                    <img src={process.env.PUBLIC_URL+"/assets/imgs/"+ activity.src} alt='Activity' className='image_card_size_act mb-3'/>

                    <p className='activity_title'>{activity.title}</p>

                    </div>
                    </div>
                )})} 

                </div>      
        </div>
</>
    )
}
const mapDispatchToProps = {
    getActivityByItinterary: itinerariesActions.getActivityByItinterary
}

export default connect(null, mapDispatchToProps)(Activity)