import axios from 'axios';

const itinerariesActions = {

    // GET ITINERARIES BY CITY ID

    getItinerariesByCityId: (id) => {
        return (dispatch, getState) => {
            axios.get('https://mytinerary-arguello.herokuapp.com/api/itineraries/'+ id)
            .then(response => dispatch({ type: 'get_itineraries_by_city_id', payload: response.data.response }))
            .catch(error => console.log(error))
        }
    },

    // GET ALL ITINERARIES

    getItineraries: () => {
        return (dispatch, getState) => {
            axios.get('https://mytinerary-arguello.herokuapp.com/api/itineraries/')
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
                    const response = await axios.put(`https://mytinerary-arguello.herokuapp.com/api/itinerary/like/${id}`, {},
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
                const response = await axios.get(`https://mytinerary-arguello.herokuapp.com/api/activities/itinerary/${id}`)
                const data = response.data.response
                return {success: true, response: data}
            } catch (error){
                return {
                    success: false, response: error
                }
            }
        }
    },

    // ADD COMMENT

    addComment: (comment) => {

        return async (dispatch, getState) => {
            try {
                const token = localStorage.getItem('token')

                const res = await axios.post('https://mytinerary-arguello.herokuapp.com/api/itinerary/comment', { ...comment }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: 'message',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })
            return res

            } catch (error) {
                return {success:false, error:error.message}
            }
        }
    },

    // EDIT COMMENT-

    editComment: (comment) => {
        
        const token = localStorage.getItem('token')

        return async (dispatch, getState) => {
            const res = await axios.post('https://mytinerary-arguello.herokuapp.com/api/itinerary/comment/'+ comment.commentID,  {comment: comment.comment} , { //comment 1> postman, comment2> parametro funcion, comment3> commentData
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: 'message',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })

            return res
        }
    },

    // DELETE COMMENT

    deleteComment: (id) => {

        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const res = await axios.delete(`https://mytinerary-arguello.herokuapp.com/api/itinerary/comment/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: 'message',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })
            return res
        }
    }

}

export default itinerariesActions;