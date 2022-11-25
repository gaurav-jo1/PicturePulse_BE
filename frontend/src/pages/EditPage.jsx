import React, { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import meta from "../assets/meta.png";
import anya from "../assets/35-The-Beauty-of-Anya-Forger.png";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import "../styling/EditPage.scss";
import client from "../react-query-client"
import { Navigate } from "react-router-dom";

const EditPage = () => {
  const { authTokens, loading } = useContext(AuthContext);

  const getInfo = (url, body) =>
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify(body),
    });

  const { data: userinfos, isLoading, isError} = useQuery(["userinfos"], () => {
      return getInfo("http://127.0.0.1:8000/userinfo/").then((t) => t.json());
    }
  );

  // let userinfos = client.getQueryData(["userinfos"])

  const [ifFun, setSIfFun] =  useState(true);
  const [name, setName] =  useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");

  if (isLoading) return <h1>Loading....</h1>;
  if (isError) return <h1>Error with request</h1>;

  if(userinfos && ifFun) {
    setName(userinfos[0].user.first_name)
    setUsername(userinfos[0].user.username)
    setBio(userinfos[0].profession)
    setEmail(userinfos[0].user.email)
    setSIfFun(false)
  }

  console.log(userinfos)
  return (
    <div className="Editpage_container">
      <Navbar />
      <div className="Editpage_container-div">
        <div className="Editpage_container_div-edit">
          <div className="Editpage_container_profile">
            <div className="Editpage_container_profile-image">
              <img src={anya} alt="Anya" width="50" height="50" />
            </div>
            <div className="Editpage_container_username">
              <p>@{username}</p>
              <strong>Change profile photo</strong>
            </div>
          </div>

          {/* Name */}
          <div className="Editpage_container_inputs">
            <div className="Editpage_container_name">
              <strong>Name</strong>
            </div>
            <div className="Editpage_container_input">
              <input type="text" value={name} onChange={(a) => setName(a.target.value)}/>
              <p>
                Help people discover your account by using the name you're known
                by: either your full name, nickname, or business name.
              </p>
            </div>
          </div>

          {/* Username */}
          <div className="Editpage_container_inputs">
            <div className="Editpage_container_name">
              <strong>Username</strong>
            </div>
            <div className="Editpage_container_input">
              <input type="text" value={username} onChange={(a) => setUsername(a.target.value)}/>
              <p>
                In most cases, you'll be able to change your username back to
                gaurav_jo18 for another 14 days.{" "}
              </p>
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
              <p>
                Provide your personal information, even if the account is used
                for a business, a pet or something else. This won't be a part of
                your public profile.
              </p>
            </div>
          </div>

          {/* Email */}
          <div className="Editpage_container_inputs">
            <div className="Editpage_container_name">
              <strong>Email</strong>
            </div>
            <div className="Editpage_container_input">
              <input type="email" value={email} onChange={(a) => setEmail(a.target.value)}/>
            </div>
          </div>

          <div className="Editpage_container_submit">
            <input type="submit" placeholder="Submit" />
          </div>
        </div>

        <div className="Editpage_meta_container">
          <div className="Editpage_meta_container_logo">
            <img src={meta} alt="Meta logo" height="25" width="35" />
            <h4>META</h4>
          </div>
          <h3>Accounts center</h3>

          <p>
            Control settings for connected experiences across Instagram, the
            Facebook app and Messenger, including story and post sharing and
            logging in.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditPage;
