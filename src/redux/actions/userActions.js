import axios from 'axios';

const userActions = {

    signUpUser: (userData) => {
        return async (dispatch, getState) => {

            const res = await axios.post('http://localhost:4000/api/auth/signup', {userData})
            dispatch({type: 'message', payload: res.data});
            console.log(res.data.message)
            console.log(userData)
        }
    }, 

    logInUser: (logedUser) => {
        return async (dispatch, getState) => {

            const user = await axios.post('http://localhost:4000/api/auth/login', { logedUser })
            if(user.data.success){
            dispatch({type: 'user', payload: user.data.response.userData});
            console.log(user.data)
            }else{ 
                console.log(user.data)
                console.log(user.data.message) }

        }
    },

    LogOutUser: (closeuser)=>{
        return async (dispatch, getState) => {
        const user = axios.post('http://localhost:4000/api/auth/signout', {closeuser})
        dispatch({type: 'user', payload: null});
        console.log(user.data)
        } 
    }


}
export default userActions;