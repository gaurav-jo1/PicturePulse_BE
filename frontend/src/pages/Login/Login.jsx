import React from "react";
import { Link } from "react-router-dom";
import home_phones from "../../assets/home_phones.png"
import Insta_log from "../../assets/Instagram_logo.png";
import "./Login.css";

const Login = () => {
  return (
    <div>
      <div>
        <img src={home_phones} alt="" />
      </div>
      <div>
        <div>
          <img src={Insta_log} alt="" />
          <form action="">
            <label>
              <span>Phone number, username, or email</span>
              <input
                aria-label="Phone number, username, or email"
                type="text"
                name="username"
              />
            </label>
            <input type="password" name="" id="" placeholder="Password" />
            <input type="submit" value="Login" />
          </form>
          <p className="one">
            <span>OR</span>
          </p>
          <Link to="/">Forgot password?</Link>
        </div>
        <div>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
        <div>Get the app</div>
      </div>
    </div>
  );
};

export default Login;
