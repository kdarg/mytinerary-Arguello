
import Home from './pages/Home'
import Cities from './pages/Cities'
import Navbar from './components/Navbar'
import Error from './components/Error'
import Footer from './components/Footer'
import Underconstruction from './components/Underconstruction'

import axios from 'axios'
import React, {useEffect, useState} from 'react'

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


function App() {

// const [input,setInput]=useState()
const [apidata, setApiData ]= useState([])


// console.log(input)

useEffect(()=>{

axios.get(`http://localhost:4000/api/allcities`)
  .then(response=>console.log(response.data.response.allcities))

},[]) 

// console.log(apidata)


  return (
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={ <Home/> }/>
          <Route path='/cities' element={ <Cities/> }/>
          <Route path='*' element={ <Error/> }/>
          <Route path='/const' element={ <Underconstruction/> }/>
        </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
