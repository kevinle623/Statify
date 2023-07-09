import { Toolbar } from "../components/toolbar"
import { Footbar } from "../components/footer"
import Spotify from 'spotify-web-api-js'
import Image from 'next/image'
import React, { Component } from 'react'


import { hashParams, username } from './home.js'

const spotifyWebApi = new Spotify();


class Topgenres extends Component {

    render(){
        return (            
            <div className="App hero3">
                <Toolbar/>
                <section id="about" className="about hero align-items-center">
                <div><h1>Coming soon...</h1></div>
                </section>
                <Footbar/>
            </div>
        )
    }
}
export default Topgenres
