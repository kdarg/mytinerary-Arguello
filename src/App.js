
import Home from './pages/Home'
import Cities from './pages/Cities'
import Navbar from './components/Navbar'
import Error from './components/Error'
import Footer from './components/Footer'
import Underconstruction from './components/Underconstruction'
import Detailscity from './pages/Detailscity'
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import LogOut from './pages/LogOut'
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {

  return (
    <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/city/:id' element={ <Detailscity/> }/>
          <Route path='/' element={ <Home/> }/>
          <Route path='/cities' element={ <Cities/> }/>
          <Route path='*' element={ <Error/> }/>
          <Route path='/const' element={ <Underconstruction/> }/>
          <Route path='/login' element={ <LogIn/> }/>
          <Route path='/signup' element={ <SignUp/> }/>
          <Route path='/logout' element={ <LogOut/> }/>
        </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
