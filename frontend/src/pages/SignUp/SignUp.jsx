import React from "react";

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
            <h3>Sign up to see photos and videos from your friends</h3>
          </div>
          <div className="Signup_container-Signup_facebook-button">
            <button>Sign up with Facebook</button>
          </div>
          <div className="separator_OR">
            <p className="one"> <span>OR</span> </p>
          </div>
          <div className="Signup_container-Signup_form-container">
            <form action="">
              <div className="form_container-div">
                <div className="form_container-email_div">
                  <input type="text" placeholder="Mobile Number or Email" />
                </div>
                <div className="form_container-fullname_div">
                  <input type="text" placeholder="Full Name" />
                </div>
                <div className="form_container-username_div">
                  <input type="text" placeholder="Username" />
                </div>
                <div className="form_container-password_div">
                  <input type="password" placeholder="Password" />
                </div>
              </div>
            </form>
          </div>
          <div className="Signup_container-desc">
            <p> People who use our service may have uploaded your contact information to instagra. <a href="/">Learn More</a></p>
            <p> By signing up, you agree to our <a href="/">Terms</a> <a href="/">Data Policy</a> and <a href="/">Cookies Policy</a>.</p>
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
