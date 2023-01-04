import React, {useContext} from 'react'
import { ThemeContext } from '../context/ThemeContextProvider'

import '../styling/Footer.scss'

const Footer = () => {
  const {theme} = useContext(ThemeContext)
  return (
    <footer>
    <div className='External_Links-container'>
        <div className='External_Links-container_group-1'>
          <a href="/"> <p>Meta</p> </a>
          <a href="/"> <p>About</p> </a>
          <a href="/"> <p>Blog</p> </a>
          <a href="/"> <p>Jobs</p> </a>
          <a href="/"> <p>Help</p> </a>
          <a href="/"> <p>API</p> </a>
          <a href="/"> <p>Privacy</p> </a>
          <a href="/"> <p>Terms</p> </a>
          <a href="/"> <p>Top Accounts</p> </a>
          <a href="/"> <p>Hashtags</p> </a>
          <a href="/"> <p>Locations</p> </a>
          <a href="/"> <p>Instagram Lite</p> </a>
          <a href="/"> <p>Contact Uploading & Non-Users</p></a>
        </div>
        <div className='External_Links-container_group-2'>
          <a href="/"> <p>Dance</p> </a>
          <a href="/"> <p>Food & Drink</p> </a>
          <a href="/"> <p>Home & Garden</p> </a>
          <a href="/"> <p>Music</p> </a>
          <a href="/"> <p>Visual Arts</p> </a>
        </div>
        <div className={`External_Links-container_group-3_${theme}`}>
          <select name="language">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="de">German</option>
            <option value="fr">French</option>
            <option value="it">Italian</option>
            <option value="ja">Japanese</option>
            <option value="ko">Korean</option>
            <option value="zh">Chinese</option>
            <option value="hi">Hindi</option>
          </select>
          &nbsp;
          &nbsp;
          <p> &#169; 2023 Instagram from Meta</p>
        </div>
    </div>
    </footer>
  )
}

export default Footer