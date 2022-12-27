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
        <div className="ChatPages_Chat_Users-container">
          <ul>
            <li>User 1</li>
            <li>User 2</li>
            <li>User 3</li>
            <li>User 4</li>
            <li>User 5</li>
          </ul>
        </div>
        <div className="ChatPages_Chats-container">
          <ul>
            <li>Sender</li>
            <li>Reciver</li>
            <li>Sender</li>
            <li>Reciver</li>
            <li>Sender</li>
            <li>Reciver</li>
          </ul>
        </div>
      </div>
      <div className="ChatPage_footer-container">
        <Footer />
      </div>
    </div>
  )
}

export default ChatPage