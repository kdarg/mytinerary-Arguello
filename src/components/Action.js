import { Link } from "react-router-dom";

const Action = () => {
  return (
    <>
      <div class="row pt-5 pb-5 py-0 bg-light d-flex justify-content-center container_action ">
        <div class="col-lg-6 col-img"></div>
        <div class="col-lg-6 py-5 ">
          
            <div class="row ">
              <div class="col-md-10 offset-md-2 ">
                <h3 className="text-center discoverslogan">
                  Discover story-worthy travel moments
                </h3>

                <div class="feature d-flex mt-5">
                  <ul>
                    <li>
                      Ready to travel? We're here to help you make the right
                      choices with guides on destinations to explore during the
                      pandemic.
                    </li>
                  </ul>
                </div>
                <div class="feature d-flex">
                  <ul>
                    <li>
                      Explore this year's expert-approved list of must-see
                      destinations, places, and unforgettable experiences
                      guaranteed to inspire.
                    </li>
                  </ul>
                </div>

                <div className="pt-5 d-flex justify-content-center">
                  <Link class="fancy" to="/cities">
                    <span class="top-key"></span>
                    <span class="text">Get started</span>
                    <span class="bottom-key-1"></span>
                    <span class="bottom-key-2"></span>
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
