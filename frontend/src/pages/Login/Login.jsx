import React from "react";

// Tools
import { Link } from "react-router-dom";

//  media files
import home_phones from "../../assets/home_phones.webp";
import Insta_log from "../../assets/Instagram_logo.webp";
import apple_store from "../../assets/apple_store.webp";
import play_store from "../../assets/play_store.webp";
import Facebook_logo from "../../assets/Facebook_logo.png";

// styling
import "./Login.scss";

const Login = () => {
  return (
    <div className="Login_container">
      <div className="Login_container-home_phone">
        <img src={home_phones} alt="" />
      </div>
      <div className="Login_container_login-form">
        <div className="Login_container_login-form_box-1">
          <div className="Login_container-login-form_instagram-image">
            <img src={Insta_log} alt="" />
          </div>
          <div className="Login_container-login_form-container">
            <form action="">
              <div className="form_container-div">
                <div className="form_container-username_div">
                  <label> <span>Phone number, username, or email</span>
                    <input aria-label="Phone number, username, or email" aria-required="true"  type="text" name="username" />
                  </label>
                </div>
                <div className="form_container-password_div">
                <label> <span>Password</span>
                  <input aria-label="Password" type="password" name="password" />
                </label>
                </div>
                <div className="form_container-submit_div">
                <input type="submit" value="Login" />
                </div>
                <div className="Login_container_login_signup_separator">
                  <p className="one"> <span>OR</span> </p>
                </div>
              </div>
              <a href="www.facebook.com">
                <div className="Login_container_login_facebook">
                    <p> <img src={Facebook_logo} alt="facebook_logo" /> &nbsp;Log in with Facebook</p>
                </div>
              </a>
              <Link to="/">Forgot password?</Link>
            </form>
          </div>
        </div>
        <div className="Login_container_login-form_box-2">
          <p> Don't have an account? <Link to="/signup">Sign Up</Link> </p>
        </div>
        <div className="Login_container_get_the_app">
          <p>Get the app</p>
          <div className="Login_container_get_instagram_store-images">
            <a href="https://apps.apple.com/in/app/instagram/id389801252">
              <img src={apple_store} alt="apple_store" />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.instagram.android&hl=en_IN&gl=US">
              <img src={play_store} alt="Play_store" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
