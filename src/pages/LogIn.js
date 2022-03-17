import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FaUser} from "react-icons/fa";
import { ImKey } from "react-icons/im";
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions';
import LoginFacebook from "../components/LoginFacebook";

const LogIn = (props) => {


    const [hidden, setHidden] = useState(true)

	const handleSubmit = (event) => {
		event.preventDefault()
		const logedUser = {
			email: event.target[0].value,
			password: event.target[1].value,
			from: "form-Login"
		}
		props.logInUser(logedUser)
	}



    return ( 

                    
            <div className="lel">
            <div  className="centerLogin containerLogin bg-light mt-5"> 
            <div  className="loginCard ">
            <p className="login">Welcome back!</p>

            <form className="formLogin2" onSubmit={handleSubmit}>
			<div className="mb-3 inputforms">
            <FaUser className="iconsmargin" />
				<input name="email" className="form-control" placeholder="Email address" type="email" />
			</div>
            
			<div className="mb-3 inputforms">
            <ImKey className="iconsmargin" />
				<input name='password' className="form-control" placeholder="Password" type={hidden ? "password" : "text"}  />
                <div className="positionhidden" onClick={() => setHidden(!hidden)}> {hidden ? <BsEyeSlash/> : <BsEye/>}
                </div>
			</div>


			<div className="">
				<Button variant='outline-dark' className="bg-button-more" as="input" type="submit" value="Log in" /> 
			</div>

			<LoginFacebook/>

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