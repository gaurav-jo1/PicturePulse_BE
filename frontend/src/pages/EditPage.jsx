import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContextProvider";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import meta from "../assets/meta.webp";
import client from "../react-query-client";
import axios from "axios";

import "../styling/EditPage.scss";
import LoadingScreen from "../components/LoadingScreen";

const EditPage = () => {
  const { authTokens,callLogout} = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const [ifFun, setIfFun] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [scroll, setScroll] = useState("");
  const [changeProfile, setChangeProfile] = useState(false);

  let navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    let file = e.target.files[0];
    setChangeProfile(false);
    setScroll("");
    const formData = new FormData();
    formData.append("picture", file);
    axios
      .patch("http://127.0.0.1:8000/userinfo/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + String(authTokens.access),
        },
      })
      .then(function (response) {
        console.log(response.status);
        if (response.status === 201) {
          client.invalidateQueries(["userinfos"]);
          navigate("/profile");
        }
      });
  };

  const postInfo = (url, body) =>
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify(body),
    });

  let onInputClick = (event) => {
    event.target.value = "";
  };

  const { data: userinfos, isLoading, isError,} = useQuery(["userinfos"], () => {
    return fetch('http://127.0.0.1:8000/userinfo/', {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      }
    }).then(response => response.json())
  });

  const mutation = useMutation(
    (body) => postInfo("http://127.0.0.1:8000/userinfo/", body),
    {onSuccess: (data) => {
      console.log("Got response from backend successfull", data);
      navigate("/profile");
      },onError(error) {
        console.log("Got error from backend", error);
      },
    }
  );

  const mutationUser = useMutation(
    (body) => postInfo("http://127.0.0.1:8000/user/", body),
    {onSuccess: (data) => {
      console.log("Got response from backend successfull", data);
      client.invalidateQueries(["userinfos"]);
      navigate("/profile");
      },onError(error) {
        console.log("Got error from backend", error);
      },
    }
  );

  function callMutation() {
    mutation.mutate({ profession: bio });
    mutationUser.mutate({ first_name: name, username: username, email: email });
  }

  if (mutation.status === "loading") return < LoadingScreen/>
  if (mutationUser.status === "loading") return < LoadingScreen/>

  if (isLoading) return <LoadingScreen />;
  if (isError) return <h1>Error with request</h1>;

  if (userinfos && ifFun) {
    setName(userinfos[0].user.first_name);
    setUsername(userinfos[0].user.username);
    setBio(userinfos[0].profession);
    setEmail(userinfos[0].user.email);
    setIfFun(false);
  }
  if (userinfos.code === "token_not_valid") return callLogout();

  return (
    <div className={`Editpage_container_${theme} ${scroll}`}>
      <Navbar />
      <div className="Editpage_container-div">
        <div className={`Editpage_container_div-edit_${theme}`}>
          <div className="Editpage_container_profile">
            <div className="Editpage_container_profile-image">
              {userinfos?.map((userinfo) => (
                <img key={userinfo.id} src={`http://127.0.0.1:8000${userinfo.picture}`} alt="profile" width="50" height="50" />
              ))}
            </div>
            <div className="Editpage_container_username">
              <p>@{username}</p>
              <strong onClick={() => {setChangeProfile(true);setScroll("disableScroll");}}>
                Change profile photo
              </strong>
            </div>
          </div>

          {/* Name */}
          <div className="Editpage_container_inputs">
            <div className="Editpage_container_name">
              <strong>Name</strong>
            </div>
            <div className="Editpage_container_input">
              <input type="text" value={name} onChange={(a) => setName(a.target.value)}/>
              <p>Help people discover your account by using the name you're known
                by: either your full name, nickname, or business name. </p>
            </div>
          </div>

          {/* Username */}
          <div className="Editpage_container_inputs">
            <div className="Editpage_container_name">
              <strong>Username</strong>
            </div>
            <div className="Editpage_container_input">
              <input type="text" value={username} onChange={(a) => setUsername(a.target.value)} />
              <p>In most cases, you'll be able to change your username back to
                gaurav_jo18 for another 14 days. </p>
            </div>
          </div>

          {/* Bio */}
          <div className="Editpage_container_inputs">
            <div className="Editpage_container_name">
              <strong>Bio</strong>
            </div>
            <div className="Editpage_container_input">
              <textarea cols="30" rows="4" value={bio} onChange={(a) => setBio(a.target.value)}></textarea>
              <strong>Personal Information</strong>
              <p>Provide your personal information, even if the account is used
                for a business, a pet or something else. This won't be a part of
                your public profile.</p>
            </div>
          </div>

          {/* Email */}
          <div className="Editpage_container_inputs">
            <div className="Editpage_container_name">
              <strong>Email</strong>
            </div>
            <div className="Editpage_container_input">
              <input type="email" value={email} onChange={(a) => setEmail(a.target.value)} />
            </div>
          </div>
          <div onClick={() => callMutation()} className="Editpage_container_submit">
            <input type="submit" placeholder="Submit" />
          </div>
        </div>

        {/* META logo Box 2 */}

        <div className={`Editpage_meta_container_${theme}`}>
          <div className="Editpage_meta_container_logo">
            <img src={meta} alt="Meta logo" height="25" width="35" />
            <h4>META</h4>
          </div>
          <h3>Accounts center</h3>
          <p>Control settings for connected experiences across Instagram, the
            Facebook app and Messenger, including story and post sharing and
            logging in.</p>
        </div>
      </div>
      <Footer />

      {/* Change Profile */}
      {changeProfile && (
        <div className="Editpage_profile_container">
          <div className="Editpage_profile_page">
            <p>Change Profile Photo</p>
            <input type="file" id="picture-input" onChange={handleChange} onClick={onInputClick} style={{ display: "none" }} />
            <ul>
              <li> <label htmlFor="picture-input">Upload Photo</label> </li>
              <li>Remove Current Photo</li>
              <li onClick={() => {setChangeProfile(false); setScroll(""); }}>
                Cancel
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPage;
