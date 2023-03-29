import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FaUser} from "react-icons/fa";
import { ImKey } from "react-icons/im";
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions';
import Swal from 'sweetalert2';

const LogIn = (props) => {

    //PASSWORD VISIBILITY 
    const [hidden, setHidden] = useState(true)

	//TOAST EMPTY FIELDS
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //HANDLE SUBMIT
	const handleSubmit = (event) => {
		event.preventDefault()

		if([email, password].includes('')){

			const Toast = Swal.mixin({
                toast: true,
                position: "center-end",
                showConfirmButton: false,
                timer: 3000,
                background: "#FFF",
                iconColor: "rgb(238, 76, 103)",
                confirmButtonColor: "rgb(221, 46, 113)",
                timerProgressBar: true,
                
                didOpen: (toast) => {
                    toast.addEventListener("mouseenter", Swal.stopTimer);
                    toast.addEventListener("mouseleave", Swal.resumeTimer);
                },
            });

            Toast.fire({
                icon: "error",
                title: `You must fill all the fields!`,
            });

		}else{

			const logedUser = {
				email: event.target[0].value,
				password: event.target[1].value,
				from: "form-Login"
			}
			props.logInUser(logedUser)
		}
	}

    return ( 

                    
            <div className="lel">
            <div  className="centerLogin containerLogin bg-light mt-5"> 
            <div  className="loginCard ">
            <p className="login">Welcome back!</p>

            <form className="formLogin2" onSubmit={handleSubmit}>
			<div className="mb-3 inputforms">
            <FaUser className="iconsmargin" />
				<input name="email" className="form-control" placeholder="Email address" type="email" value={email} onChange={ e => setEmail(e.target.value) } />
			</div>
            
			<div className="mb-3 inputforms">
            <ImKey className="iconsmargin" />
				<input name='password' className="form-control" placeholder="Password" type={hidden ? "password" : "text"} value={password} onChange={ e => setPassword(e.target.value) }  />

                <div className="positionhidden" onClick={() => setHidden(!hidden)}> {hidden ? <BsEyeSlash/> : <BsEye/>}

                </div>
			</div>

			<div className="">
				<Button variant='outline-dark' className="bg-button-more" as="input" type="submit" value="Log in" /> 
			</div>

			<div className="text-center mt-4">Don't have an account yet?</div>
			<div><Link to="/signup" className="signuphere"> <span className="fw-bold colorlogsign">Sign up here</span></Link> </div> 
		</form>

            </div>
            </div>

            </div>
    );
}

const mapDispatchToProps = {
	logInUser: userActions.logInUser,
}

export default connect(null, mapDispatchToProps)(LogIn);