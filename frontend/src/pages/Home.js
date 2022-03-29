
import Carousel from '../components/Carousel'
import Header from '../components/Header'
import Action from '../components/Action'

const pagehome = () => {

    window.scrollTo({ top: 0, behavior: "smooth"})
    
    return ( 
      <>
        <Header/>
        <Action/>
        <Carousel/>
      </>
      );
}

export default pagehome;