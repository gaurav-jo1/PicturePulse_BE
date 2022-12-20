import React from 'react'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

const ChatPage = () => {
  return (
    <div className='ChatPage_container'>
      <div className="ChatPage_navbar-container">
        <Navbar />
      </div>
      <div className="ChatPage_div_container">
        <h1>Chat Page</h1>
      </div>
      <div className="ChatPage_footer-container">
        <Footer />
      </div>
    </div>
  )
}

export default ChatPage