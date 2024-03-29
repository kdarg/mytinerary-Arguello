const Noresults = () => {
    return ( 
        <>
        <div className="d-flex justify-content-center mt-5">
            <div className="d-flex justify-content-center align-items-center cardfound p-3 text-center ">
                <p className="mt-2">- No results to show - </p>
                <p className="mt-2">Please try again</p>
                <img src={process.env.PUBLIC_URL+"/assets/imgs/noresult.png"} alt='No_results' className="size-img-search"/> 
            </div>
        </div>
        </>
    );
}

export default Noresults;