import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions';

function FacebookSignup(props) {

  const responseFacebook = async (res) => {
    // console.log(res)
    // console.log(res.name)

        const separatedFullName = res.name.split(" ")
        console.log(separatedFullName)

        const userData = {
        firstname:separatedFullName[0],
        lastname:separatedFullName[1],
        email: res.email,
        password: res.id,
        urlimage: res.picture.data.url,
        country: 'Private',
        from: "facebook",
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