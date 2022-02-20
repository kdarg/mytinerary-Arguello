import { Link } from "react-router-dom";

import { UilGithub } from '@iconscout/react-unicons'


const footer = () => {
  return (
    <>
      <div className="footer">
      
      <div className="">
      <a href="https://github.com/kdarg" target='blank'><UilGithub className="uil uil-github githublogo"></UilGithub></a>
        </div>
        <div className="footernav">
          <Link className="linkfooter" to="/">
            Home
          </Link>
          <Link className="linkfooter" to="/Cities">
            Cities
          </Link>
        </div>


        <img className="image_logo_footer" src="./assets/imgs/logofooter.png" />
      </div>

      <div className="bg-dark w-100  hfooter  ">
        {" "}
        <span className="bg-dark text-light  ">
          © 2022 Copyright - All right reserved | Designed by Karen Argüello{" "}
        </span>{" "}
      </div>
    </>
  );
};

export default footer;
