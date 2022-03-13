import Button from  'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { FaUser, FaImage } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { ImKey } from "react-icons/im"

const SignUp = () => {
    return ( 

            
        <div className="lel">
        <div  className="centerLogin containerLogin bg-light mt-5"> 
        <div  className="loginCard ">
        <p className="login">Hello adventurer!</p>

        <form className="formLogin">

        <div className="mb-3 inputforms">
        <FaUser className="iconsmargin" />
            <input name="firstname" className="form-control" placeholder="First Name" type="text" vale="" onChange="" />
        </div>

        <div className="mb-3 inputforms">
        <FaUser className="iconsmargin" />
            <input name="lastname" className="form-control" placeholder="Last Name" type="text" vale="" onChange="" />
        </div>

        <div className="mb-3 inputforms"> 
        <MdEmail className="iconsmargin" />
            <input name="email" className="form-control" placeholder="Email address" type="email" />
        </div>
        
        <div className="mb-3 inputforms">
        <ImKey className="iconsmargin" />
            <input name="password" className="form-control" placeholder="Password" type="password" vale="" onChange="" />

        </div>

            <div className="mb-3 inputforms">
            <FaImage className="iconsmargin" />
            <input name='urlimage' id="urlimage" className="form-control" placeholder="URL image" type="url" vale="" onChange="" />
        </div>



        <div className="">
            <Button variant='outline-dark' className="bg-button-more" > Log in </Button>
        </div>
        <div className="text-center mt-4">Already have an account? <Link to="/login" className="signuphere"> <span className="">Log in here</span></Link> </div>
    </form>

        </div>
        </div>

        </div>
    );
}

export default SignUp;