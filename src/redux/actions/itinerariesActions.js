import axios from 'axios';

const itinerariesActions = {

    getItinerariesByCityId: (id) => {
        return (dispatch, getState) => {

            axios.get('http://localhost:4000/api/itineraries/'+ id)
            .then(response => dispatch({ type: 'get_itineraries_by_city_id', payload: response.data.response }))
            .catch(error => console.log(error))

        }
    },

    getItineraries: () => {
        return (dispatch, getState) => {

            axios.get('http://localhost:4000/api/itineraries/')
            .then(response => dispatch({ type: 'get_itineraries', payload: response.data.response }))
                .catch(error => console.log(error))

        }
    },

    // likeItinerary: (id, token) =>{
    //     return async () => {
    //             try{
    //                 const response = await axios.put(`http://localhost:4000/api/itinerary/like/${id}`, {},{
    //                     headers:{
    //                         Authorization: `Bearer ${token}`
    //                     }
    //                 })
    //                 return response
    //             } catch(error) {
    //                 console.log(error)
    //             }
    //     }
    // },    

    
    likeItinerary: (id) =>{

        const token = localStorage.getItem('token')

        return async () => {

                try{
                    const response = await axios.put(`http://localhost:4000/api/itinerary/like/${id}`, {},
                    {headers:{
                            Authorization: "Bearer "+token
                    }
                    })
                    return response

                } catch(error) {
                    console.log(error)
                }
        }
    },  

    getActivityByItinterary: (id) => {
        return async () => {
            try { 
                const response = await axios.get(`http://localhost:4000/api/activities/itinerary/${id}`)
                console.log(id)
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