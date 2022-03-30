import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions';

function LoginFacebook(props) {

    const responseFacebook = async (res) => {

        const separatedFullName = res.name.split(" ")
        console.log(separatedFullName)
        
        const logedUser = {
            firstname:separatedFullName[0],
            lastname:separatedFullName[1],
            email: res.email,
            password: res.id,
            from: "facebook",
        }
        await props.logInUser(logedUser)
    }

    return (
        <FacebookLogin
        cssClass="buttonsocial my-facebook-button-class"
        icon="fa-facebook"
        textButton="Log in with Facebook "
        appId="505181134513821"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        />
    );
}

const mapDispatchToProps = {
    logInUser: userActions.logInUser,

}

export default connect(null, mapDispatchToProps)(LoginFacebook);