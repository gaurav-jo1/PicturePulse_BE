import React from "react";
import { Link } from "react-router-dom";
import home_phones from "../../assets/home_phones.png";
import Insta_log from "../../assets/Instagram_logo.png";
import apple_store from "../../assets/apple_store.png"
import play_store from "../../assets/play_store.png"
import "./Login.css";

const Login = () => {
  return (
    <div className="Login_container">
      <div className="Login_container-home_phone">
        <img src={home_phones} alt="" />
      </div>
      <div className="Login_container_login-form">
        <div  className="Login_container_login-form_box-1">
          <div className="Login_container-login-form_instagram-image">
            <img src={Insta_log} alt="" />
          </div>
          <form action="">
            <label> <span>Phone number, username, or email</span>
              <input aria-label="Phone number, username, or email" type="text" name="username" />
            </label>
            <label> <span>Password</span>
              <input aria-label="Password" type="password" name="password" />
            </label>
            <input type="submit" value="Login" />
          </form>
          <p className="one">
            <span>OR</span>
          </p>
          <Link to="/">Forgot password?</Link>
        </div>
        <div className="Login_container_login-form_box-2">
          <p> Don't have an account? <Link to="/signup">Sign Up</Link> </p>
        </div>
        <div>
            <p>Get the app</p>
            <a href="https://l.instagram.com/?u=https%3A%2F%2Fitunes.apple.com%2Fapp%2Finstagram%2Fid389801252%3Fpt%3D428156%26ct%3Digweb.loginPage.badge%26mt%3D8%26vt%3Dlo&e=ATNl49llX1MhHT9UME_XXX6Ih1RngdIDEhcq45cL4c9DrZeM0cJKe_6b7zvAKwOfor0x_SQwdw_cknSg&s=1">
                <img src={apple_store} alt="apple_store" />
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=utm_source%3Dinstagramweb%26utm_campaign%3DloginPage%26ig_mid%3D57652024-1E63-42A5-AC1D-4751BDF3982C%26utm_content%3Dlo%26utm_medium%3Dbadge">
                <img src={play_store} alt="Play_store" />
            </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
