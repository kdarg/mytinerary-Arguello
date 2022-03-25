
import Home from './pages/Home'
import Cities from './pages/Cities'
import Navbar from './components/Navbar'
import Error from './components/Error'
import Footer from './components/Footer'
import Underconstruction from './components/Underconstruction'
import Detailscity from './pages/Detailscity'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, {useEffect} from 'react'
import { connect } from 'react-redux';
import userActions from './redux/actions/userActions';

function App(props) {

  useEffect(() => {

    if(localStorage.getItem('token')!== null){
      const token = localStorage.getItem("token")
      props.VerifyToken(token)
    }
  },[])

  return (
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/city/:id' element={ <Detailscity/> }/>
          <Route path='/' element={ <Home/> }/>
          <Route path='/cities' element={ <Cities/> }/>
          <Route path='*' element={ <Error/> }/>
          <Route path='/const' element={ <Underconstruction/> }/>
          {/* <Route path='/login' element={ <LogIn/> }/>
          <Route path='/signup' element={ <SignUp/> }/> */}
          {!props.user &&<Route path="/login" element={<LogIn/>} />}
			    {!props.user &&<Route path="/signup" element={<SignUp />} />}
        </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

const mapDispatchToProps = {
	VerifyToken: userActions.VerifyToken,
}


const mapStateToProps = (state)=>{
  return{
    user: state.userReducer.user
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
