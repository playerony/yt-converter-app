import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import logo from '../assets/logo.png'

import '../styles/Navbar.css'

class Navbar extends Component {
  render() {
    return (
      <ul className="nav">
        <li>
          <Link to='/'>
            <img className="logo" src={logo} alt='logo' />
          </Link>
        </li>
        <div className="textSection">
          <li>
            <Link className="text" to='/videoEditor'>
              Videos
            </Link>
          </li>
          <li>
            <Link className="text" to='/videoConverter'>
              Video Converter
            </Link>
          </li>
          <li>
            <Link className="text" to='/memeGenerator'>
              Meme generator
            </Link>
          </li>
          <li>
            <Link className="text" to='/photoEditor'>
              Photo editor
            </Link>
          </li>
          <li>
            <Link className="text" to='/photoGallery'>
              Gallery
            </Link>
          </li>
        </div>
      </ul>
    )
  }
}
export default Navbar