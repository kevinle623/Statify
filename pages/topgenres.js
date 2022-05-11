import { Toolbar } from "../components/toolbar"
import Spotify from 'spotify-web-api-js'
import Image from 'next/image'
import React, { Component } from 'react'


import { hashParams, username } from './home.js'

const spotifyWebApi = new Spotify();


class Topgenres extends Component {

    render(){
        return (
            
            <div className="App hero">
                <Toolbar/>
                <section id="about" className="about hero align-items-center">
                <div><h1>Coming soon...</h1></div>
                </section>
                <footer id="footer" className="footer hello"> 
<div className="container ">
      <div className="copyright hello">
        &copy; Copyright <strong><span>Statify</span></strong>. All Rights Reserved.
      </div>
      
      <div className="credits hello">
  
        Developed by   <a href="https://github.com/tahazaryab" target="_blank" rel="noopener noreferrer"> Taha Zaryab  </a>  and  <a href="https://github.com/kevinle623" target="_blank" rel="noopener noreferrer">Kevin Le  </a>
      </div>
    </div>

</footer>

            </div>

        )
    }
    
}
export default Topgenres