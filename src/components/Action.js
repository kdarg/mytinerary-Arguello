import { Link } from "react-router-dom";
import Tooltip from '@mui/material/Tooltip';

const Action = () => {
  return (
    <>
      <div className="row pt-5 pb-4 py-0 bg-light d-flex justify-content-center container_action ">
        <div className="col-lg-6 col-img"></div>
        <div className="col-lg-6 py-5 ">
          
            <div className="direction_action">
              <div className="col-md-10  ">
                <h3 className="text-center discoverslogan">
                  Discover story-worthy travel moments
                </h3>

                <div className="feature d-flex mt-5">
                  <ul>
                    <li>
                      Do love snow and travelling? We're here to help you make the right
                      choices with guides on destinations to explore during the
                      pandemic.
                    </li>
                  </ul>
                </div>
                <div className="feature d-flex">
                  <ul>
                    <li>
                      Explore this year's expert-approved list of must-see
                      destinations, places, and unforgettable experiences
                      guaranteed to inspire.
                    </li>
                  </ul>
                </div>
                <div className="feature d-flex">
                  <ul>
                    <li>
                      And remember: <Tooltip title="J.R.R. Tolkien"  arrow placement="bottom"><span className='tolkien'> Not all those who wander are lost.</span></Tooltip>
                    </li>
                  </ul>
                </div>

                <div className="pt-5 d-flex justify-content-center">
                  <Link className="fancy" to="/cities">
                    <span className="top-key"></span>
                    <span className="text">Get started</span>
                    <span className="bottom-key-1"></span>
                    <span className="bottom-key-2"></span>
                  </Link>
                </div>
              </div>
            </div>
          
        </div>
      </div>
    </>
  );
};

export default Action;
