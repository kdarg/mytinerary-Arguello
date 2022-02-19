import { Link } from 'react-router-dom';

const header = () => {
    return (
        <>
            <div className="hero vh-100 d-flex align-items-center">
                    <div className="container">
                        <div className="row">
                            <div className=" col-lg-7 mx-auto text-center">
                                <h1 className="ff-title">MyTinerary</h1>
                                
                                <p className="pt-5 pb-5 slogan">Find your perfect trip, designed by insiders who know and love their cities!</p>


                                <Link class="fancy" to='/cities' >

                                    <span class="top-key"></span>
                                    <span class="text">Get started</span>
                                    <span class="bottom-key-1"></span>
                                    <span class="bottom-key-2"></span>
                                </Link>
                            </div>
                        </div>

                    </div>
            </div>
        </>
    );
};

export default header;
