
import { Toolbar } from "../components/toolbar"
import Image from 'next/image'
import Spotify from 'spotify-web-api-js'
import { Footbar } from "../components/footer"
import { hashParams, username } from './home.js'
import React, { Component } from 'react'

const spotifyWebApi = new Spotify();

var lst=[]
var time = 'short_term'
var text = 'Past Month'


class Topartist extends Component {
  constructor() {
    super();
    const params = hashParams;

    if (params.access_token){
      spotifyWebApi.setAccessToken(params.access_token)
      this.getUserOption(time)
      this.getTopArtists(time)

    }
    this.state ={

      loggedIn: params.access_token ? true : false,

      nowTime: {

        message: text,
      },
      nowList: {

        songs: [],
      },
    }
  }
  getTopArtists(time) {
    spotifyWebApi.getMyTopArtists({limit: 50, time_range: time})
      .then((response) => {

        this.getUserOption(time)
        this.setState({

          nowList: {
            songs: response.items,
          }
        })
      })
}

getUserOption(time) {
  if (time == 'short_term') {
    this.setState({
      nowTime: {
        message: 'Past Month'
      }
    })
  } else if (time == 'medium_term') {
    this.setState({
      nowTime: {
        message: 'Past 6 Months'
      }
    })
  } else {
    this.setState({
        nowTime: {
          message: 'All Time'
        }
      }
    )
  }
  }


WordList(props) {




  const words = props.words;
  const items = words.map((song, idx) =>
  <div key = {idx} className="col-lg-4 col-md-6 portfolio-item filter-app">
            <div className="portfolio-wrap">
              <img src={song.images[0].url} className="img-album img-fluid" alt=""/>
              <div className="portfolio-info">
                <h4>{idx + 1}. {song.name}</h4>
                <p>Followers: {(song.followers.total).toLocaleString()} </p>
                <div className="portfolio-links">

                  <a href={song.external_urls.spotify} target="_blank" rel="noopener noreferrer" title="VISIT ON SPOTIFY"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-spotify" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z"/>
</svg></a>
                </div>
              </div>
            </div>
          </div>
  );


  return (
    <section id="portfolio" className="portfolio">

    <div className="container" data-aos="fade-up">
      <div className="row gy-4 portfolio-container" data-aos="fade-up" data-aos-delay="200">
        {items}
        </div>
      </div>

    </section>
  );
}

    render() {
        return (
            <div className="App hero3">
            <Toolbar/>

            <section  id="about" className="about hero2">
                <div className='hello'><h1>Your Top Artists </h1>
                <h3>({this.state.nowTime.message})</h3>
                <div className="hello btn-group" role="group" aria-label="Basic radio toggle button group">
                <button type="button" className="btn btn-outline-dark" onClick={() => this.getTopArtists('short_term')}>
                  Past Month
                </button>
                <button type="button" className="btn btn-outline-dark" onClick={() => this.getTopArtists('medium_term')}>
                  Past 6 Months
                </button>
                <button type="button" className="btn btn-outline-dark" onClick={() => this.getTopArtists('long_term')}>
                  All Time
                </button>
                </div>
                </div>

                <this.WordList words={this.state.nowList.songs}/>

                </section>
               <Footbar/>
            </div>
        )
    }
  }

  export default Topartist
