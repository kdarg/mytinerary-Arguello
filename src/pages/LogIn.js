import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { FaUser} from "react-icons/fa";
import { ImKey } from "react-icons/im";


const LogIn = () => {


    const [hidden, setHidden] = useState(true)






    return ( 

                    
            <div className="lel">
            <div  className="centerLogin containerLogin bg-light mt-5"> 
            <div  className="loginCard ">
            <p className="login">Welcome back!</p>

            <form className="formLogin">
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
				<Button variant='outline-dark' className="bg-button-more" > Log in </Button>
			</div>
			<div className="text-center mt-4">Don't have an account yet? <Link to="/signup" className="signuphere"> <span className="">Sign up</span></Link> </div>
		</form>

            </div>
            </div>

            </div>

    );
}

export default LogIn;