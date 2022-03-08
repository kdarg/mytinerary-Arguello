const Noitineraries = () => {
    return ( 
        <>
        <div className="d-flex justify-content-center mt-5">
            <div className="d-flex justify-content-center align-items-center cardfound p-3 text-center ">

                <p className="mt-2 ">It seems there are no itineraries yet! </p>
                <img src={process.env.PUBLIC_URL+"/assets/imgs/noitineraries.png"} className="size-img-search margin-img-noiti"/> 

            </div>
        </div>
        </>
    );
}

export default Noitineraries;