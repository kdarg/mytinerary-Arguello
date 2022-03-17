import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions';
import './styleSign.css'

function FacebookSignup(props) {

  const responseFacebook = async (res) => {
    console.log(res)
    console.log(res.name)

    

        const separatedFullName = res.name.split(" ")
        console.log(separatedFullName)

     // let nombre = separatedFullName[0]
      //let apellido = separatedFullName[1]
      //console.log(nombre)
      //console.log(apellido)



        const userData = {
        firstname:separatedFullName[0],
        lastname:separatedFullName[1],
        email: res.email,
        password: res.id,
        urlimage: res.picture.data.url,
        country: 'Internet',
        from: "facebook",
      //pais:props.pais
    }
    await props.signUpUser(userData)
    }





  return (
    <FacebookLogin
    cssClass="buttonsocial my-facebook-button-class"
    icon="fa-facebook"
    textButton=" Sign up with Facebook"
      appId="505181134513821"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}

    />
  );
}
const mapDispatchToProps = {
    signUpUser: userActions.signUpUser,

}

export default connect(null, mapDispatchToProps)(FacebookSignup);