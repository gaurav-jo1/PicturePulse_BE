import React from 'react'
import Navbar from '../../components/Navbar/Navbar'

import insta_background from '../../assets/insta_background.png'

import './Home.scss'

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="home_background">
        <img src={insta_background} alt="" />
      </div>
    </div>
  )
}

export default Home