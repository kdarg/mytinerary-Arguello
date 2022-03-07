import axios from 'axios';

const itinerariesActions = {

    getItinerariesByCityId: (id) => {
        return (dispatch, getState) => {

            axios.get('http://localhost:4000/api/itineraries/'+ id)
            .then(response => dispatch({ type: 'get_itineraries_by_city_id', payload: response.data.response }))
            .catch(error => console.log(error))
            //            .then(response => console.log(response))

        }
    },

    getItineraries: () => {
        return (dispatch, getState) => {

            axios.get('http://localhost:4000/api/itineraries/')
            .then(response => dispatch({ type: 'get_itineraries', payload: response.data.response }))
            //.then(response => console.log(response.data.response))
                .catch(error => console.log(error))

        }
    },


}

export default itinerariesActions;