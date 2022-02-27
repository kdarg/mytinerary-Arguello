
import Home from './pages/Home'
import Cities from './pages/Cities'
import Navbar from './components/Navbar'
import Error from './components/Error'
import Footer from './components/Footer'
import Underconstruction from './components/Underconstruction'
import Detailscity from './components/Detailscity'
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
        </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
