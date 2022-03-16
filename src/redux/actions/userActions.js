import axios from 'axios';
const Swal = require("sweetalert2");

const userActions = {

    signUpUser: (userData) => {
        return async (dispatch, getState) => {

            try{

                const res = await axios.post('http://localhost:4000/api/auth/signup', {userData})
            dispatch({type: 'message', payload: res.data});
            console.log(res.data)
            console.log(res.data.message)
            console.log(userData)



            if (res.data.success) {
                dispatch({ type: "newuser", payload: res.data });
                console.log(res.data)
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    background: "#FFF",
                    iconColor: "rgb(86, 216, 151)",
                    confirmButtonColor: "rgb(221, 46, 113)",
                    timerProgressBar: true,
                    
                    didOpen: (toast) => {
                        toast.addEventListener("mouseenter", Swal.stopTimer);
                        toast.addEventListener("mouseleave", Swal.resumeTimer);
                    },
                });
    
                Toast.fire({
                    icon: "success",
                    title: `<span style="color:rgb(221, 46, 113)"> Welcome, ${res.data.firstname} ${res.data.lastname}! <span>`,
                });
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    confirmButtonColor: "rgb(221, 46, 113)",
                    background: "#FFF",
                    iconColor: "rgb(238, 76, 103)",
                    timerProgressBar: true,
                    
                    didOpen: (toast) => {
                        toast.addEventListener("mouseenter", Swal.stopTimer);
                        toast.addEventListener("mouseleave", Swal.resumeTimer);
                    },
                });

                Toast.fire({
                    icon: "error",
                    title: `<span style="color:rgb(221, 46, 113)">User already registered!</span>`,
                    background: "#FFF",
                    iconColor: "rgb(216, 86, 86)",
                    confirmButtonColor: "rgb(221, 46, 113)",
                });
            }

            } catch (error) {
                console.log(error);
            }

            





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