
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions';

const LogOut = (props) => {

    
	function SignOut() {
		props.LogOutUser(props.user.email)
	}


    return ( 
<>
        {props.user ? <><h1> Hello {props.user.firstname}! </h1>
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <button onClick={SignOut} className="btn btn-primary btn-block" style={{ maxWidth: 400 }}> Log out  </button>
        </div>
    </>
        : <h1>User not connected</h1>}

    </>

    )
}

const mapStateToProps = (state) => {
	return {
		user: state.userReducer.user,
	}
}
const mapDispatchToProps = {
	LogOutUser: userActions.LogOutUser,

}

export default connect(mapStateToProps, mapDispatchToProps)(LogOut);