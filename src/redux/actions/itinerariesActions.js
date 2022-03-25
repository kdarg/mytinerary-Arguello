import axios from 'axios';

const itinerariesActions = {

    // GET ITINERARIES BY CITY ID

    getItinerariesByCityId: (id) => {
        return (dispatch, getState) => {
            axios.get('http://localhost:4000/api/itineraries/'+ id)
            .then(response => dispatch({ type: 'get_itineraries_by_city_id', payload: response.data.response }))
            .catch(error => console.log(error))
        }
    },

    // GET ALL ITINERARIES

    getItineraries: () => {
        return (dispatch, getState) => {
            axios.get('http://localhost:4000/api/itineraries/')
            .then(response => dispatch({ type: 'get_itineraries', payload: response.data.response }))
                .catch(error => console.log(error))
        }
    },

    // LIKE & DISLIKES ITINERARY

    likeItinerary: (id) =>{

        return async () => {
            const token = localStorage.getItem('token')
            //console.log(token)

                try{
                    const response = await axios.put(`http://localhost:4000/api/itinerary/like/${id}`, {},
                    {headers:{
                            Authorization: "Bearer "+token
                    }
                    })
                    console.log(response)
                    return {success:true}

                } catch(error) {
                    console.log(error)
                }
        }
    },  

    // GET ACTIVITY BY ITINERARY

    getActivityByItinterary: (id) => {
        return async () => {
            try { 
                const response = await axios.get(`http://localhost:4000/api/activities/itinerary/${id}`)
                const data = response.data.response
                return {success: true, response: data}
            } catch (error){
                return {
                    success: false, response: error
                }
            }
        }
    },

}

export default itinerariesActions;