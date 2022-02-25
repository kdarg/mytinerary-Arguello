import Button from 'react-bootstrap/Button'
import { Link } from "react-router-dom";

const Cardscities = () => {
    return ( 
        <>


        <div className="d-flex justify-content-center mt-3 mb-3">
        <input type='text' placeholder='Search city..' className='input-search'/> 

        </div>



    <div class="d-flex flex-wrap justify-content-center align-items-center">

        <div class="maincontainer">

        <div class="thecard">

        <div class="thefront"> 
            
            <div class=" d-flex flex-column justify-content-center align-items-center polaroid-two ">
            <img src="./telgart.png" alt='City' class='image_card_size d-flex'/>

            <div class='fw-bold p-4'>
                <p>Bavaria - Germany</p>
            </div>

            </div>
        
        </div>

        <div class="theback d-flex flex-column justify-content-center align-items-center"> 
            
            <h1 class="text-center fs-4">Bavaria - Germany</h1><p>Garmisch is a favoured holiday spot for skiing, snowboarding, and hiking, having some of the best skiing areas (Garmisch Classic and Zugspitze) in Germany. It was the site of the 1936 Winter Olympics, the first to feature alpine skiing.</p>

        <Link to='/const'><Button variant='outline-dark'>See more</Button></Link>
        </div>

        </div>
        </div>

        <div class="maincontainer">

        <div class="thecard">

        <div class="thefront"> 
            
            <div class=" d-flex flex-column justify-content-center align-items-center polaroid-two ">
            <img src="./telgart.png" alt='City' class='image_card_size d-flex'/>

            <div class='fw-bold p-4'>
                <p>Kyoto - Japan</p>
            </div>

            </div>
        
        </div>

        <div class="theback d-flex flex-column justify-content-center align-items-center"> 
            
            <h1 class="text-center fs-4">Kyoto - Japan</h1><p>Majestic and delicate, friendly and proud, deceitful and kind, haunting and serene, modern and classic, simple and ritual describe Kyoto. It has been called a lucky city as it has saved from all bombings. Kyoto with its medieval spirit through a modern city represents Japanese culture.</p>

        <Link to='/const'><Button variant='outline-dark'>See more</Button></Link>
        </div>

        </div>
        </div>

        <div class="maincontainer">

<div class="thecard">

<div class="thefront"> 
    
    <div class=" d-flex flex-column justify-content-center align-items-center polaroid-two ">
    <img src="./telgart.png" alt='City' class='image_card_size d-flex'/>

    <div class='fw-bold p-4'>
        <p>Reykjavík - Iceland</p>
    </div>

    </div>

</div>

<div class="theback d-flex flex-column justify-content-center align-items-center"> 
    
    <h1 class="text-center fs-4">Reykjavík - Iceland</h1><p>Reykjavík is the northernmost capital of a sovereign state in the world. It is among the cleanest, greenest, and safest cities in the world. It is extremely walkable, making it a perfect destination to explore by foot. The word Reykjavík translates literally as “smoky bay”.</p>

<Link to='/const'><Button variant='outline-dark'>See more</Button></Link>
</div>

</div>
        </div>

        <div class="maincontainer">

<div class="thecard">

<div class="thefront"> 
    
    <div class=" d-flex flex-column justify-content-center align-items-center polaroid-two ">
    <img src="./telgart.png" alt='City' class='image_card_size d-flex'/>

    <div class='fw-bold p-4'>
        <p>Bavaria - Germany</p>
    </div>

    </div>

</div>

<div class="theback d-flex flex-column justify-content-center align-items-center"> 
    
    <h1 class="text-center fs-4">Bavaria - Germany</h1><p>Garmisch is a favoured holiday spot for skiing, snowboarding, and hiking, having some of the best skiing areas (Garmisch Classic and Zugspitze) in Germany. It was the site of the 1936 Winter Olympics, the first to feature alpine skiing.</p>

<Link to='/const'><Button variant='outline-dark'>See more</Button></Link>
</div>

</div>
        </div>

        <div class="maincontainer">

<div class="thecard">

<div class="thefront"> 
    
    <div class=" d-flex flex-column justify-content-center align-items-center polaroid-two ">
    <img src="./telgart.png" alt='City' class='image_card_size d-flex'/>

    <div class='fw-bold p-4'>
        <p>Bavaria - Germany</p>
    </div>

    </div>

</div>

<div class="theback d-flex flex-column justify-content-center align-items-center"> 
    
    <h1 class="text-center fs-4">Bavaria - Germany</h1><p>Garmisch is a favoured holiday spot for skiing, snowboarding, and hiking, having some of the best skiing areas (Garmisch Classic and Zugspitze) in Germany. It was the site of the 1936 Winter Olympics, the first to feature alpine skiing.</p>

<Link to='/const'><Button variant='outline-dark'>See more</Button></Link>
</div>

</div>
        </div>

    </div> 
        </>
    );
}

export default Cardscities;