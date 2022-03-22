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

    likeItinerary: (id, token) =>{
        return async () => {
                try{
                    const response = await axios.put(`http://localhost:4000/api/itinerary/like/${id}`, {},{
                        headers:{
                            Authorization: `Bearer ${token}`
                        }
                    })
                    return response
                } catch(error) {
                    console.log(error)
                }
        }
    },    

}


export default itinerariesActions;