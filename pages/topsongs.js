
import { Toolbar } from "../components/toolbar"
import Image from 'next/image'
import { Footbar } from "../components/footer"
import Spotify from 'spotify-web-api-js'

import React, { Component } from 'react'

import { hashParams, username } from './home.js'

const spotifyWebApi = new Spotify();
var time = 'short_term'
var text = 'Past Month'
var lst = []
var index = 0

class Topsongs extends Component {


  constructor() {
    super();
    const params = hashParams;

    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token)
      this.getUserOption(time)
      this.getTopSongs(time)

    }
    this.state = {

      loggedIn: params.access_token ? true : false,

      nowTime: {
        message: text,
      },

      nowList: {
        songs: [],
      },

      nowDisplay: {
        image: '',
        songname: '',
        artistname: '',
        rank: '',
      }
    }
  }




  getTopSongs(time) {
    spotifyWebApi.getMyTopTracks({ limit: 50, time_range: time })
      .then((response) => {

        this.getUserOption(time)
        this.setState({
          nowList: {
            songs: response.items,
          }
        }
        )
      })
  }


  getUserOption(time) {
    if (time == 'short_term') {
      this.setState({
        nowTime: {
          message: 'Past Month'
        }
      }
      )
    }
    else if (time == 'medium_term') {
      this.setState({
        nowTime: {
          message: 'Past 6 Months'
        }
      }
      )
    }
    else {
      this.setState({
        nowTime: {
          message: 'All Time'
        }
      }
      )
    }
  }

  getNowDisplay(rank, song, artist) {
    this.setState({
      nowDisplay: {
        songname: song.name,
        rank: rank,
        artistname: artist.name,
      }
    }
    )
  }

  WordList(props) {
    const words = props.words;
    const items = words.map((song, idx) =>
      <div key = {idx}>

        <div className="mx-auto card mb-3">
          <div className="row-margin row align-items-center g-0 ">
            <div className="portfolio-wrap img-margin col-md-2">

                <img src={song.album.images[0].url} className="img-margin img-fluid rounded-start" alt="..." />
                <a href= {song.external_urls.spotify} target="_blank" rel="noopener noreferrer"><div className="portfolio-info">
               <h1>{idx + 1}</h1>

              </div></a>

            </div>
            <div className="song-info-marg col-md-9">
              <div className="song-info-marg card-body">
                <a href={song.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                  <h5 className="card-title">{song.name} </h5>
                </a>
                <a href={song.artists[0].external_urls.spotify} target="_blank" rel="noopener noreferrer">
                  <p className="card-text">{song.artists[0].name} </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>


    );


    return (
      <section id="portfolio" className="portfolio">
        <div className="container" data-aos="fade-up">
          {items}
        </div>

      </section>
    );
  }

  render() {
    return (
      <div className="App hero3">
        <Toolbar />
        <section  id="about" className="about hero2">

        <div className= 'hello '><h1>Your Top Tracks</h1>
          <h3>({this.state.nowTime.message})</h3>

          <div className="hello btn-group" role="group" aria-label="Basic radio toggle button group">
            <button type="button" className="btn btn-outline-dark" onClick={() => this.getTopSongs('short_term')}>
              Past Month
            </button>
            <button type="button" className="btn btn-outline-dark" onClick={() => this.getTopSongs('medium_term')}>
              Past 6 Months
            </button>
            <button type="button" className="btn btn-outline-dark" onClick={() => this.getTopSongs('long_term')}>
              All Time
            </button>
          </div>
        </div>
        <this.WordList words={this.state.nowList.songs} />,
      </section>
      <Footbar/>
      </div>
    )
  }
}

export default Topsongs
