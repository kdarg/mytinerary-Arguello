import Button from  'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { FaUser, FaImage } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { ImKey } from "react-icons/im"
import React, {useEffect, useState} from 'react'
import axios from "axios"
import { BsEye, BsEyeSlash } from "react-icons/bs";
import userActions from "../redux/actions/userActions";
import { connect } from 'react-redux';

const SignUp = (props) => {

    const [hidden, setHidden] = useState(true)



    const [countries, setCountries] = useState([])

    useEffect(() => {
        axios
        .get("https://restcountries.com/v2/all?fields=name")
        .then((res) => setCountries(res.data))
            .catch((error) => console.log(error))
    }, [])

    // .get("https://restcountries.com/v3.1/all")
    // .then((res) => ((res.data).forEach(element => {
    //     setCountries(element.name.common)
    // })))



const handleSubmit = (event) => {
    event.preventDefault()
    const userData = {
        firstname: event.target[0].value,
        lastname: event.target[1].value,
        email: event.target[2].value,
        password: event.target[3].value,
        urlimage: event.target[4].value,
        country: event.target[5].value,
        from: "form-Signup"
    }
    props.signUpUser(userData)
}

    
    return ( 

            
        <div className="lel">
        <div  className="centerLogin containerLogin bg-light mt-5"> 
        <div  className="loginCard ">
        <p className="login">Hello adventurer!</p>

        <form className="formLogin" onSubmit={handleSubmit}>

        <div className="mb-3 inputforms">
        <FaUser className="iconsmargin" />
            <input name="firstname" className="form-control" placeholder="First Name" type="text" />
        </div>

        <div className="mb-3 inputforms">
        <FaUser className="iconsmargin" />
            <input name="lastname" className="form-control" placeholder="Last Name" type="text"  />
        </div>

        <div className="mb-3 inputforms"> 
        <MdEmail className="iconsmargin" />
            <input name="email" className="form-control" placeholder="Email address" type="email" />
        </div>
        
        <div className="mb-3 inputforms">
        <ImKey className="iconsmargin" />
        <input name='password' className="form-control" placeholder="Password" type={hidden ? "password" : "text"} />
                <div className="positionhidden" onClick={() => setHidden(!hidden)}> {hidden ? <BsEyeSlash/> : <BsEye/>}
        </div>
        </div>

            <div className="mb-3 inputforms">
            <FaImage className="iconsmargin" />
            <input name='urlimage' id="urlimage" className="form-control" placeholder="URL image" type="url" />
        </div>

            <div className="mb-3 inputforms">
            <select name="country" >
            <option >Choose your country</option>
            
            {countries.map((country, key) => (
                <option  value={country.name} key={key}>
                    {country.name}
                    </option>
                    ))}

        </select>
        </div>

        <div className="">
            <Button type="submit" variant='outline-dark' className="bg-button-more" > Create account </Button>
        </div>
        <div className="text-center mt-4">Already have an account? <Link to="/login" className="signuphere"> <span className="">Log in</span></Link> </div>

        
    </form>

        </div>
        </div>

        </div>
    );
}

const mapDispatchToProps = {
    signUpUser: userActions.signUpUser,
    
}

const mapStateToProps = (state) => {
	return {
		message: state.userReducer.message,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);