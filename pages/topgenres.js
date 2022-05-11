import { Toolbar } from "../components/toolbar"
import Spotify from 'spotify-web-api-js'

import React, { Component } from 'react'


import { hashParams, username } from './home.js'

const spotifyWebApi = new Spotify();


class Topgenres extends Component {

    render(){
        return (
            
            <div className="App hero">
                <Toolbar/>
                <section id="about" class="about hero align-items-center">
                <div><h1>Coming soon...</h1></div>
                </section>
                <footer id="footer" class="footer hello"> 
<div class="container ">
      <div class="copyright hello">
        &copy; Copyright <strong><span>Statify</span></strong>. All Rights Reserved.
      </div>
      
      <div class="credits hello">
  
        Developed by   <a href="https://github.com/tahazaryab" target="_blank"> Taha Zaryab  </a>  and  <a href="https://github.com/kevinle623" target="_blank">Kevin Le  </a>
      </div>
    </div>

</footer>

            </div>

        )
    }
    
}
export default Topgenres