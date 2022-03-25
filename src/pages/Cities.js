import Cardscities from '../components/Cardscities';
import Headercities from '../components/Headercities';

const pagecities = () => {

    window.scrollTo({ top: 0, behavior: "smooth"})
    return (  
        <>
            <Headercities/>
            <Cardscities/>
        </>
);
}

export default pagecities;