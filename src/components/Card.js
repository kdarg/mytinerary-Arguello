const individualcard = ({city}) => {

    
    return (  
        <div className='twocards'> 
            <div className='container_carousel d-flex justify-content-center align-items-center'>
                <div className=" d-flex flex-column justify-content-center align-items-center  polaroid ">
                <img src={city.src} alt='City' className='image_card_size d-flex'/>

                <div className='fw-bold p-4'>
                    <p className='card_ffamily'>{city.city} -- {city.country}</p>
                </div>

                </div>

            </div>
        </div>
        
    );
}
 
export default individualcard;