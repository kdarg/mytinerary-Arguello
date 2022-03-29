import axios from 'axios';

const citiesActions = {

    //GET ALL CITIES

    getCities : () => {
        return async (dispatch, getState) => {
            const response = await axios.get('https://mytinerary-arguello.herokuapp.com/api/allcities')
            dispatch({type:'all_cities', payload:response.data.response}) 
        }
    },

    // FILTER CITIES

    filterCities: (value) => {
        return (dispatch) => {
        dispatch({ type: "filter_cities", payload: value })
        }
    },

    //GET ONE CITY

    getOneCity: (id) => {
        return async (dispatch, getState) => {
            const response = await axios.get(`https://mytinerary-arguello.herokuapp.com/api/city/${id}`)
            dispatch ({type: 'one_city', payload: response.data.response})
        }
    }

}

export default citiesActions;