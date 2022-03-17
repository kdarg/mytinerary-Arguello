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
                    position: "center-end",
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
                    title: `<span style="color:rgb(221, 46, 113)"> Welcome, ${res.data.firstname || userData.firstname} ${res.data.lastname || userData.lastname}!  <span>`,
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


            try{

                const user = await axios.post('http://localhost:4000/api/auth/login', { logedUser })

                    console.log(user.data)

                if(user.data.success){
    
                    localStorage.setItem('token',user.data.response.token)
    
                    dispatch({type: 'user', payload: user.data.response.logedUser || user.data.response.userData });
    
                    console.log(user.data.response.userData.firstname)


                    const Toast = Swal.mixin({
                        toast: true,
                        position: "center-end",
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
                    })
                    Toast.fire({
                        icon: "success",
                        title: `<span style="color:rgb(221, 46, 113)"> Welcome back, ${user.data.response.userData.firstname || logedUser.firstname} ${user.data.response.userData.lastname || logedUser.lastname}!  <span>`,
                    })





                }else{ 
    

                    console.log(user.data)
                    console.log(user.data.message) 
                
                
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
                        title: `<span style="color:rgb(221, 46, 113)">You are already logged in!</span>`,
                        background: "#FFF",
                        iconColor: "rgb(216, 86, 86)",
                        confirmButtonColor: "rgb(221, 46, 113)",
                    });
                
                }
                    


            }catch (error) {
                console.log(error);
            }


            

        }
    },

    LogOutUser: (closeuser)=>{
        return async (dispatch, getState) => {
        //const user = axios.post('http://localhost:4000/api/auth/signout', {closeuser})

        localStorage.removeItem('token')

        dispatch({type: 'user', payload: null});

        //console.log(user.data)
        } 
    }


}
export default userActions;