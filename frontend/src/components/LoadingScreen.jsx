import React from 'react'
import instagram from "../assets/instagram.webp"

import "../styling/LoadingScreen.scss"

const LoadingScreen = () => {
  return (
    <div className='LoadingScreen_container'>
        <div className="LoadingScreen_meta-logo_container">
            <img src={instagram} alt="meta" />
        </div>
    </div>
  )
}

export default LoadingScreen