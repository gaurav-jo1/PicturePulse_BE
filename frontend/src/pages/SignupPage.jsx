import React,{useContext} from "react";
import { IoLogoFacebook } from "react-icons/io";

// Tools
import { Link } from "react-router-dom";

//  media files
import Insta_logo_light from "../assets/Instagram_logo_light.webp";
import Insta_logo_dark from "../assets/Instagram_logo_dark.webp"
import Footer from "../components/Footer";
import Getapp from "../components/Getapp";
import { ThemeContext } from "../context/ThemeContextProvider";

// styling
import "../styling/SignupPage.scss";

const SignupPage = () => {
  const {theme} = useContext(ThemeContext)
  return (
    <div className={`Signup_container ${theme}`}>
      <div className="Signup_container-form">
        <div className={`Signup_container-box_1_${theme}`}>
          <div className="Signup_container-Instagram_image">
          {theme === "light" ? <img src={Insta_logo_light} alt="Instagram" /> : <img src={Insta_logo_dark} alt="Instagram" />  }
          </div>
          <div className="Signup_container-Heading_signup_for_friends">
            <h2>Sign up to see photos and videos from your friends</h2>
          </div>
          <a className="Login_container_login-a" href="www.facebook.com">
            <div className="Login_container_login_facebook">
              <h2><IoLogoFacebook /></h2>
              <p> &nbsp;Log in with Facebook </p>
            </div>
          </a>
          <div className={`separator_OR_${theme}`}>
            <p className="one"> <span>OR</span> </p>
          </div>
          <div className="Signup_container-Signup_form-container">
            <form action="">
              <div className="form_container_inputs">
                <div className={`form_container-input_label_div-${theme}`}>
                  <label>
                    <input type="text" name="username" placeholder="Mobile Number or Email"/>
                  </label>
                </div>
                <div className={`form_container-input_label_div-${theme}`}>
                  <label>
                    <input type="text" name="full_name" placeholder="Full Name"/>
                  </label>
                </div>
                <div className={`form_container-input_label_div-${theme}`}>
                  <label>
                    <input type="text" name="username" placeholder="Username" />
                  </label>
                </div>
                <div className={`form_container-input_label_div-${theme}`}>
                  <label>
                    <input type="password" name="password" placeholder="Password"/>
                  </label>
                </div>
                <div className="Signup_container-desc">
                  <p> People who use our service may have uploaded your contact information to instagra. <a href="/">Learn More</a></p>
                  <p> By signing up, you agree to our <a href="/">Terms</a> <a href="/">Data Policy</a> and <a href="/">Cookies Policy</a>.</p>
                </div>
                <div className={`form_container-submit_div-${theme}`}>
                    <button type="submit">Sign Up</button>
                  </div>
              </div>
            </form>
          </div>
        </div>
        <div className={`Signup_container-box_2_${theme}`}>
          <p> Have an account? <Link to="/login"><span>Log in</span></Link> </p>
        </div>
        <div className="Signup_container-box_3">
          <Getapp />
        </div>
      </div>
      <div className="Login_container-external_links">
        <Footer />
      </div>
    </div>
  );
};

export default SignupPage;
