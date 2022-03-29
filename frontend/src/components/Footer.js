import { Link } from "react-router-dom";
import { UilGithub } from '@iconscout/react-unicons';
import { UilInstagram } from '@iconscout/react-unicons';
import { UilTwitter } from '@iconscout/react-unicons';
import { UilFacebook } from '@iconscout/react-unicons';

const footer = () => {
  return (
    <>
      <div className="footer">
        <img className="image_logo_footer" src={process.env.PUBLIC_URL+"/assets/imgs/logofooter.png"} alt="Footer-logo" />

          <div className="footernav">
            <Link className="linkfooter" to="/">Home</Link>
            <Link className="linkfooter" to="/Cities">Cities</Link>
          </div>

          <div>
            <a href="https://github.com/kdarg" target='blank'><UilGithub className="uil uil-github githublogo"></UilGithub></a>
            <a href="https://www.instagram.com/karuarguello/" target='blank'><UilInstagram className="uil uil-instagram githublogo"></UilInstagram></a>
            <a href="https://twitter.com/ImSillyKaru" target='blank'><UilTwitter className="uil uil-twitter githublogo"></UilTwitter></a>
            <a href="https://www.facebook.com/KarenxArguello/" target='blank'><UilFacebook className="uil uil-facebook githublogo"></UilFacebook></a>
          </div>
      </div>

      <div className="bg-dark w-100 hfooter">
        <span className="bg-dark text-light">
          © 2022 Copyright - All right reserved | Designed by Karen Argüello
        </span>
      </div>
    </>
  );
};

export default footer;
