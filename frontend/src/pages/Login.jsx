// Tools
import React, { useContext } from "react";
import { Link } from "react-router-dom";

// Component
import Footer from "../components/Footer";
import { ThemeContext } from "../context/ThemeContextProvider";

//  media files
import Insta_logo_light from "../assets/Instagram_logo_light.webp";
import Insta_logo_dark from "../assets/Instagram_logo_dark.webp"
import { IoLogoFacebook } from "react-icons/io";


import Getapp from "../components/Getapp";
// styling
import "../styling/Login.scss";
import Header from "../components/Header";

const Login = () => {
  const {theme} = useContext(ThemeContext)
  return (
    <div className={`Login_container ${theme}`}>
      <div className="Login_header_container">
        <Header />
      </div>
      <div className="Login_container-Instagram_main">
        <div className="Login_container-home_phone">
          <div className="Login_container-home_screenshots"></div>
        </div>
        <div className="Login_container-login_form-container">
          <div className={`Login_container_login-form_box-1_${theme}`}>
            <div className="Login_container-login-form_instagram-image">
              {theme === "light" ? <img src={Insta_logo_light} alt="Instagram" /> : <img src={Insta_logo_dark} alt="Instagram" />  }
            </div>
            <div className="form_container-div">
              <form>
                <div className="form_container_inputs">
                  <div className="form_container-input_label_div">
                    <label>
                      <input type="text" name="email" required placeholder="Phone number, username, or email" />
                    </label>
                  </div>
                  <div className="form_container-input_label_div">
                    <label>
                      <input type="password" name="password" placeholder="Password" required/>
                    </label>
                  </div>
                  <div className="form_container-submit_div">
                    <button type="submit">Log in</button>
                  </div>
                </div>
                <div className="separator_OR">
                  <p className="one"> <span>OR</span> </p>
                </div>
                <div className="form_container_links">
                  <a className="Login_container_login-a" href="www.facebook.com">
                    <div className="Login_container_login_facebook">
                      <h2> <IoLogoFacebook /></h2>
                      <p> &nbsp;Log in with Facebook </p>
                    </div>
                  </a>
                  <Link className="Login_container-forgot_password-p" to="/"> Forgot password?</Link>
                </div>
              </form>
            </div>
          </div>
          <div className="Login_container_login-form_box-2">
            <p> Don't have an account? <Link to="/signup">Sign Up</Link>{" "}</p>
          </div>
          <div className="Login_container_login-form_box-3"> <Getapp /></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
