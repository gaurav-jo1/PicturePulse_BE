import React from "react";

import apple_store from "../assets/apple_store.webp";
import play_store from "../assets/play_store.webp";

import '../styling/Getapp.scss'

const Getapp = () => {
  return (
    <div className="Login_container_get_the_app">
      <div className="Login_container_get_app_heading">
      <p>Get the app</p>
      </div>
      <div className="Login_container_get_instagram_store-images">
        <a href="https://apps.apple.com/in/app/instagram/id389801252">
          <img src={apple_store} alt="apple_store" />
        </a>
        <a href="https://play.google.com/store/apps/details?id=com.instagram.android&hl=en_IN&gl=US">
          <img src={play_store} alt="Play_store" />
        </a>
      </div>
    </div>
  );
};

export default Getapp;
