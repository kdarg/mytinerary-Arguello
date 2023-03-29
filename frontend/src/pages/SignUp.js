import Button from  'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { FaUser, FaImage } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { ImKey } from "react-icons/im"
import { BiWorld } from "react-icons/bi";
import React, {useEffect, useState} from 'react'
import axios from "axios"
import { BsEye, BsEyeSlash } from "react-icons/bs";
import userActions from "../redux/actions/userActions";
import { connect } from 'react-redux';
import Swal from 'sweetalert2'

const SignUp = (props) => {

    //PASSWORD VISIBILITY 
    const [hidden, setHidden] = useState(true)

    //API COUNTRIES
    const [countries, setCountries] = useState([])

    useEffect(() => {
        axios
        .get("https://restcountries.com/v2/all?fields=name")
        .then((res) => setCountries(res.data))
            .catch((error) => console.log(error))
    }, [])

    //TOAST EMPTY FIELDS
    const [lastname, setLastname] = useState('')
    const [firstname, setFirstname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [urlimage, setUrlimage] = useState('')
    const [country, setCountry] = useState('')

    //HANDLE SUBMIT
    const handleSubmit = (event) => {
        event.preventDefault()
        
        if([firstname, lastname, email, password, urlimage, country].includes('')){

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

    }

    return ( 

        <div className="lel">
        <div  className="centerLogin containerLogin bg-light mt-5"> 
        <div  className="loginCard ">
        <p className="login">Hello adventurer!</p>

        <form className="formLogin" onSubmit={handleSubmit}>

        <div className="mb-3 inputforms">
        <FaUser className="iconsmargin" />
            <input name="firstname" className="form-control" placeholder="First Name" type="text" value={firstname} onChange={ e => setFirstname(e.target.value) } />
        </div>

        <div className="mb-3 inputforms">
        <FaUser className="iconsmargin" />
            <input name="lastname" className="form-control" placeholder="Last Name" type="text" value={lastname} onChange={ e => setLastname(e.target.value) } />
        </div>

        <div className="mb-3 inputforms"> 
        <MdEmail className="iconsmargin" />
            <input name="email" className="form-control" placeholder="Email address" type="email" value={email} onChange={ e => setEmail(e.target.value) } />
        </div>
        
        <div className="mb-3 inputforms">
        <ImKey className="iconsmargin" />
        <input name='password' className="form-control" placeholder="Password" type={hidden ? "password" : "text"}  value={password} onChange={ e => setPassword(e.target.value) } />
                <div className="positionhidden" onClick={() => setHidden(!hidden)}> {hidden ? <BsEyeSlash/> : <BsEye/>}
        </div>
        </div>

        <div className="mb-3 inputforms">
        <FaImage className="iconsmargin" />
        <input name='urlimage' id="urlimage" className="form-control" placeholder="URL image" type="url"  value={urlimage} onChange={ e => setUrlimage(e.target.value) } />
        </div>

        <div className="mb-3 inputforms ">
            <BiWorld className='iconsmargin'/>
            <select className='selectwidth form-control'  name="country" value={country} onChange={ e => setCountry(e.target.value) }>
            <option>Choose your country</option>
            
            {countries.map((country, key) => (
                <option value={country.name} key={key}>
                    {country.name}
                    </option>
                    ))}
            </select>
        </div>

        <div className="">
            <Button type="submit" variant='outline-dark' className="bg-button-more" > Create account </Button>
        </div>
        <div className="text-center mt-4">Already have an account? </div> 
        <div><Link to="/login" className="signuphere"> <span className="fw-bold colorlogsign">Log in here</span></Link> </div>

        
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