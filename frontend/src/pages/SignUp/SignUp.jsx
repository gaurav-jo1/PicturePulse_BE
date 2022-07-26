import React from "react";
import { IoLogoFacebook } from "react-icons/io";

// Tools
import { Link } from "react-router-dom";

//  media files
import Insta_log from "../../assets/Instagram_logo.webp";
import Footer from "../../components/Footer/Footer";
import Getapp from "../../components/Getapp/Getapp";

// styling
import "./SignUp.scss";

const SignUp = () => {
  return (
    <div className="Signup_container">
      <div className="Signup_container-form">
        <div className="Signup_container-box_1">
          <div className="Signup_container-Instagram_image">
            <img src={Insta_log} alt="instalogo" />
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
          <div className="separator_OR">
            <p className="one"> <span>OR</span> </p>
          </div>
          <div className="Signup_container-Signup_form-container">
            <form action="">
              <div className="form_container_inputs">
                <div className="form_container-input_label_div">
                  <label>
                    <span>Mobile Number or Email</span>
                    <input type="text" name="username" />
                  </label>
                </div>
                <div className="form_container-input_label_div">
                  <label>
                    <span>Full Name</span>
                    <input type="text" name="full_name" />
                  </label>
                </div>
                <div className="form_container-input_label_div">
                  <label>
                    <span>Username</span>
                    <input type="text" name="username" />
                  </label>
                </div>
                <div className="form_container-input_label_div">
                  <label>
                    <span>Password</span>
                    <input type="password" name="password" />
                  </label>
                </div>
                <div className="Signup_container-desc">
                  <p> People who use our service may have uploaded your contact information to instagra. <a href="/">Learn More</a></p>
                  <p> By signing up, you agree to our <a href="/">Terms</a> <a href="/">Data Policy</a> and <a href="/">Cookies Policy</a>.</p>
                </div>
                <div className="form_container-submit_div">
                  <button type="submit">Sign up</button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="Signup_container-box_2">
          <p> Have an account? <Link to="/login">Log in</Link> </p>
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

export default SignUp;
