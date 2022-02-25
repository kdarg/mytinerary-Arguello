import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";

const Cardscities = () => {
    return ( 
        <>


        <div className="d-flex justify-content-center mt-3 mb-3">
        <input type='text' placeholder='Search city..' className='input-search'/> 

        </div>


    <div className="d-flex flex-wrap justify-content-center align-items-center">

        <div className="maincontainer">

        <div className="thecard">

        <div className="thefront"> 
            
            <div className=" d-flex flex-column justify-content-center align-items-center polaroid-two ">
            <img src="./telgart.png" alt='City' className='image_card_size d-flex'/>

            <div className='fw-bold p-4'>
                <p>Bavaria - Germany</p>
            </div>

            </div>
        
        </div>

        <div className="theback d-flex flex-column justify-content-center align-items-center"> 
            
            <h1 className="text-center fs-4">Bavaria - Germany</h1><p>Garmisch is a favoured holiday spot for skiing, snowboarding, and hiking, having some of the best skiing areas (Garmisch Classic and Zugspitze) in Germany. It was the site of the 1936 Winter Olympics, the first to feature alpine skiing.</p>

        <Link to='/const'><Button variant='outline-dark'>See more</Button></Link>
        </div>

        </div>
        </div>

        <div className="maincontainer">

        <div className="thecard">

        <div className="thefront"> 
            
            <div className=" d-flex flex-column justify-content-center align-items-center polaroid-two ">
            <img src="./telgart.png" alt='City' className='image_card_size d-flex'/>

            <div className='fw-bold p-4'>
                <p>Bavaria - Germany</p>
            </div>

            </div>
        
        </div>

        <div className="theback d-flex flex-column justify-content-center align-items-center"> 
            
            <h1 className="text-center fs-4">Bavaria - Germany</h1><p>Garmisch is a favoured holiday spot for skiing, snowboarding, and hiking, having some of the best skiing areas (Garmisch Classic and Zugspitze) in Germany. It was the site of the 1936 Winter Olympics, the first to feature alpine skiing.</p>

        <Link to='/const'><Button variant='outline-dark'>See more</Button></Link>
        </div>

        </div>
        </div>

        <div className="maincontainer">

<div className="thecard">

<div className="thefront"> 
    
    <div className=" d-flex flex-column justify-content-center align-items-center polaroid-two ">
    <img src="./telgart.png" alt='City' className='image_card_size d-flex'/>

    <div className='fw-bold p-4'>
        <p>Bavaria - Germany</p>
    </div>

    </div>

</div>

<div className="theback d-flex flex-column justify-content-center align-items-center"> 
    
    <h1 className="text-center fs-4">Bavaria - Germany</h1><p>Garmisch is a favoured holiday spot for skiing, snowboarding, and hiking, having some of the best skiing areas (Garmisch Classic and Zugspitze) in Germany. It was the site of the 1936 Winter Olympics, the first to feature alpine skiing.</p>

<Link to='/const'><Button variant='outline-dark'>See more</Button></Link>
</div>

</div>
        </div>

        <div className="maincontainer">

<div className="thecard">

<div className="thefront"> 
    
    <div className=" d-flex flex-column justify-content-center align-items-center polaroid-two ">
    <img src="./telgart.png" alt='City' className='image_card_size d-flex'/>

    <div className='fw-bold p-4'>
        <p>Bavaria - Germany</p>
    </div>

    </div>

</div>

<div className="theback d-flex flex-column justify-content-center align-items-center"> 
    
    <h1 className="text-center fs-4">Bavaria - Germany</h1><p>Garmisch is a favoured holiday spot for skiing, snowboarding, and hiking, having some of the best skiing areas (Garmisch Classic and Zugspitze) in Germany. It was the site of the 1936 Winter Olympics, the first to feature alpine skiing.</p>

<Link to='/const'><Button variant='outline-dark'>See more</Button></Link>
</div>

</div>
        </div>

        <div className="maincontainer">

<div className="thecard">

<div className="thefront"> 
    
    <div className=" d-flex flex-column justify-content-center align-items-center polaroid-two ">
    <img src="./telgart.png" alt='City' className='image_card_size d-flex'/>

    <div className='fw-bold p-4'>
        <p>Bavaria - Germany</p>
    </div>

    </div>

</div>

<div className="theback d-flex flex-column justify-content-center align-items-center"> 
    
    <h1 className="text-center fs-4">Bavaria - Germany</h1><p>Garmisch is a favoured holiday spot for skiing, snowboarding, and hiking, having some of the best skiing areas (Garmisch Classic and Zugspitze) in Germany. It was the site of the 1936 Winter Olympics, the first to feature alpine skiing.</p>

<Link to='/const'><Button variant='outline-dark'>See more</Button></Link>
</div>

</div>
        </div>


    </div> 

        </>
    );
}

export default Cardscities;