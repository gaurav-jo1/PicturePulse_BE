// Tools
import React, { useState, useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";

// Component
import Footer from "../components/Footer";
import { ThemeContext } from "../context/ThemeContextProvider";

//  media files
import Insta_logo_light from "../assets/Instagram_logo_light.webp";
import Insta_logo_dark from "../assets/Instagram_logo_dark.webp";
import { IoLogoFacebook } from "react-icons/io";

import Getapp from "../components/Getapp";
// styling
import "../styling/LoginPage.scss";
import Header from "../components/Header";
import { AuthContext } from "../context/AuthContext";
import LoadingScreen from "../components/LoadingScreen";

const LoginPage = () => {
  const { theme } = useContext(ThemeContext);
  const { setAuthTokens, setUser,setLoading } = useContext(AuthContext);
  const [userInput, setUserInput] = useState("zuck");
  const [userPassword, setUserPassword] = useState("mypassword123");
  let navigate = useNavigate();

  const mutation = useMutation(['getKeys'],
    (body) => axios.post("http://127.0.0.1:8000/api/token/", body),
    {
      onSuccess(data) {
        setAuthTokens(data.data);
        setUser(jwt_decode(data.data.access));
        localStorage.setItem("authTokens", JSON.stringify(data.data));
        navigate("/");
        setLoading(true)
      },
      onError(error) {
        alert("Got error from backend", error);
      },
    }
  );

  if (mutation.status === "loading") return < LoadingScreen/>

  function callLogin(e) {
    e.preventDefault();
    mutation.mutate({ username: userInput, password: userPassword });
  }
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
              {theme === "light" ? (
                <img src={Insta_logo_light} alt="Instagram" />
              ) : (
                <img src={Insta_logo_dark} alt="Instagram" />
              )}
            </div>
            <div className="form_container-div">
              <form>
                <div className="form_container_inputs">
                  <div className={`form_container-input_label_div-${theme}`}>
                    <label>
                      <input type="text" name="username" value={userInput} onChange={(e) => setUserInput(e.target.value)} placeholder="Username" required />
                    </label>
                  </div>
                  <div className={`form_container-input_label_div-${theme}`}>
                    <label>
                      <input type="password" name="password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} placeholder="Password" required/>
                    </label>
                  </div>
                  <div className={`form_container-submit_div-${theme}`}>
                    <button onClick={callLogin} type="submit"> Log in </button>
                  </div>
                </div>
                <div className={`separator_OR_${theme}`}>
                  <p className="one">
                    <span>OR</span>
                  </p>
                </div>
                <div className={`form_container_links_${theme}`}>
                  <a className="Login_container_login-a" href="www.facebook.com">
                    <div className="Login_container_login_facebook">
                      <h2> <IoLogoFacebook /></h2>
                      <p> &nbsp;Log in with Facebook </p>
                    </div>
                  </a>
                  <Link className="Login_container-forgot_password-p" to="/">
                    Forgot password?
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className={`Login_container_login-form_box-2_${theme}`}>
            <p>
              {" "}
              Don't have an account?{" "}
              <Link to="/signup">
                <span>Sign Up</span>
              </Link>{" "}
            </p>
          </div>
          <div className="Login_container_login-form_box-3">
            {" "}
            <Getapp />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
