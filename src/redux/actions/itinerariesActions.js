import axios from 'axios';

const itinerariesActions = {

    getItineraries: (id) => {
        return (dispatch, getState) => {

            axios.get('http://localhost:4000/api/itineraries/'+ id)
                .then(response => dispatch({ type: 'get_itineraries', payload: response.data.respuesta }))
                .catch(error => console.log(error))

        }
    },

}

export default itinerariesActions;