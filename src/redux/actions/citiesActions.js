import axios from 'axios';

const citiesActions = {

    getCities : () => {
        return async (dispatch, getState) => {
            const response = await axios.get('http://localhost:4000/api/allcities')
            dispatch({type:'all_cities', payload:response.data.response}) 
        }
    },

    filterCities: (value) => {
        return (dispatch) => {
           dispatch({ type: "filter_cities", payload: value })
        }
     },



    //  getOneCity: (id) => {
    //      return(dispatch, getState) => {
    //          dispatch ({type: 'GET_ONE_CITY', payload: id})
    //      }
    //  }

}

export default citiesActions;