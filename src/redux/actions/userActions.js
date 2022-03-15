import axios from 'axios';

const userActions = {

    signUpUser: (userData) => {
        return async (dispatch, getState) => {

            const res = await axios.post('http://localhost:4000/api/auth/signup', {userData})
            dispatch({type: 'message', payload: res.data});
            //console.log(res.data)


        }
    }




}

export default userActions;