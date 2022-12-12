import React,{useState, useContext} from "react";
import { useMutation } from "@tanstack/react-query";
import { IoLogoFacebook } from "react-icons/io";
import { useNavigate } from "react-router-dom";

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
import LoadingScreen from "../components/LoadingScreen";

const SignupPage = () => {
  const [userEmail, setUserEmail] = useState(null);
  const [userFullName, setUserFullName] = useState(null);
  const [userUsername, setUserUsername] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const {theme} = useContext(ThemeContext)

  let navigate = useNavigate();

  const postSignUp = (url, body) =>
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const mutation = useMutation(['userSignup'],
  (body) => postSignUp("http://127.0.0.1:8000/register/", body),
  {
    onSuccess(data) {
      console.log("Got response from backend", data)
      navigate("/");
    },
    onError(error) {
      alert("Got error from backend", error);
    },
  }
);


  function callSignUp(e) {
    e.preventDefault();
    mutation.mutate({username: userUsername,  password: userPassword, email:userEmail,first_name:userFullName });
  }

  if (mutation.status === "loading") return < LoadingScreen/>

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
                  <label> <input type="email" name="email" onChange={(e) => setUserEmail(e.target.value)} placeholder="Email Address" required /> </label>
                </div>
                <div className={`form_container-input_label_div-${theme}`}>
                  <label> <input type="text" name="full_name" onChange={(e) => setUserFullName(e.target.value)} placeholder="Full Name" required/> </label>
                </div>
                <div className={`form_container-input_label_div-${theme}`}>
                  <label> <input type="text" name="username" onChange={(e) => setUserUsername(e.target.value)} placeholder="Username" required/> </label>
                </div>
                <div className={`form_container-input_label_div-${theme}`}>
                  <label> <input type="password" name="password" onChange={(e) => setUserPassword(e.target.value)} placeholder="Password" required/> </label>
                </div>
                <div className="Signup_container-desc">
                  <p> People who use our service may have uploaded your contact information to instagra. <a href="/">Learn More</a></p>
                  <p> By signing up, you agree to our <a href="/">Terms</a> <a href="/">Data Policy</a> and <a href="/">Cookies Policy</a>.</p>
                </div>
                <div className={`form_container-submit_div-${theme}`}>
                    <button onClick={callSignUp} type="submit">Sign Up</button>
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
