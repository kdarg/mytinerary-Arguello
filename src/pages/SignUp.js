import Button from  'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { FaUser, FaImage } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { ImKey } from "react-icons/im"
import React, {useEffect, useState} from 'react'
import axios from "axios"
import { BsEye, BsEyeSlash } from "react-icons/bs";

const SignUp = () => {

    const [hidden, setHidden] = useState(true)



//     const [countries, setCountries] = useState([])

//     useEffect(() => {
//         axios
//         .get("https://restcountries.com/v3.1/all")
//         .then((res) => ((res.data).forEach(element => {
//             console.log(element.name.common)
//         })))

//             .catch((error) => console.log(error))
//     }, [])

// console.log(countries)





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
        <input name='password' className="form-control" placeholder="Password" type={hidden ? "password" : "text"} vale="" onChange="" />
                <div className="positionhidden" onClick={() => setHidden(!hidden)}> {hidden ? <BsEyeSlash/> : <BsEye/>}
        </div>
        </div>

            <div className="mb-3 inputforms">
            <FaImage className="iconsmargin" />
            <input name='urlimage' id="urlimage" className="form-control" placeholder="URL image" type="url" vale="" onChange="" />
        </div>

            <div className="mb-3 inputforms">
            <select name="country" onChange="">
            <option>Choose your country</option>
{/*             
            {countries.map((country, key) => (
                <option value={country} key={key}>
                    {country}
                    </option>
                    ))} */}

        </select>
        </div>

        <div className="">
            <Button variant='outline-dark' className="bg-button-more" > Sign up </Button>
        </div>
        <div className="text-center mt-4">Already have an account? <Link to="/login" className="signuphere"> <span className="">Log in here</span></Link> </div>

        
    </form>

        </div>
        </div>

        </div>
    );
}

export default SignUp;