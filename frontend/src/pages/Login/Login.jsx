import React from "react";

// Tools
import { Link } from "react-router-dom";

//  media files
import home_phones from "../../assets/home_phones.webp";
import Insta_log from "../../assets/Instagram_logo.webp";

import { IoLogoFacebook } from "react-icons/io";

import Getapp from "../../components/Getapp/Getapp";
// styling
import "./Login.scss";
import Footer from "../../components/Footer/Footer";

const Login = () => {
  return (
    <div className="Login_container">
      <div className="Login_container-Instagram_main">
        <div className="Login_container-home_phone">
          <img src={home_phones} alt="Insta_pics" />
        </div>
        <div className="Login_container-login_form-container">
          <div className="Login_container_login-form_box-1">
            <div className="Login_container-login-form_instagram-image">
              <img src={Insta_log} alt="" />
            </div>
              <div className="form_container-div">
                <form action="">
                  <div className="form_container_inputs">
                      <div  className="form_container-input_label_div">
                        <label>
                          <span>Phone number, username, or email</span>
                        <input type="text" name="username" />
                        </label>
                      </div>
                    <div className="form_container-input_label_div">
                        <label>
                          <span>Password</span>
                          <input type="password" name="password" />
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
                    <a href="www.facebook.com">
                    <div className="Login_container_login_facebook">
                      <IoLogoFacebook />
                      <p> &nbsp;Log in with Facebook </p>
                    </div>
                    </a>
                    <Link className="Login_container-forgot_password-p" to="/">Forgot password?</Link>
                  </div>
                </form>
              </div>
          </div>
          <div className="Login_container_login-form_box-2">
            <p> Don't have an account? <Link to="/signup">Sign Up</Link>  </p>
          </div>
          <div className="Login_container_login-form_box-3">
            <Getapp />
          </div>
        </div>
      </div>
        <Footer />
    </div>
  );
};

export default Login;
