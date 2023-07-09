import {
  Toolbar
} from "../components/toolbar"
import {
  Footbar
} from "../components/footer"
import Spotify from 'spotify-web-api-js'
import Image from 'next/image'
import React, {
  Component
} from 'react'
import {
  hashParams,
  username
} from './home.js'

const spotifyWebApi = new Spotify();
var lst = []

function convertTime(time) {
  var isoDateTime = new Date(time);
  const stime = new Date(time).toLocaleTimeString('en', {
    timeStyle: 'short',
    hour12: false,
    timeZone: 'EST'
  });

  var localDateTime = isoDateTime.toLocaleDateString() + " " + stime;

  return (localDateTime)
}

class History extends Component {
  constructor() {
    super();
    const params = hashParams;

    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token)
      this.getHistorySongs()
    }
    this.state = {

      loggedIn: params.access_token ? true : false,
      nowList: {

        songs: [],
      },
    }
  }

  getHistorySongs() {
    spotifyWebApi.getMyRecentlyPlayedTracks({
        limit: 50
      })
      .then((response) => {

        this.setState({

          nowList: {
            songs: response.items,
          }
        })
      })
  }

  WordList(props) {
      const words = props.words;
      const items = words.map((song, idx) =>
      <tr key = {idx}>
      <th scope="row" className= 'num-history'>{idx + 1}</th>
      <td>
        <div className="container">
            <div className="hello row align-items-center">
                <div className="col-lg-4">
                <a href = {song.track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                              <img src = {song.track.album.images[0].url} alt = '' className= 'list-img'/>
                      </a>
                  </div>
            <div className="col-lg-8 song-detail">
              <a href = {song.track.external_urls.spotify} target="_blank" rel="noopener noreferrer"><div className= 'song-name'>
                {song.track.name}
                </div> </a>
                  <a href = {song.track.artists[0].external_urls.spotify} target="_blank" rel="noopener noreferrer">
                    <div className='artist'>
                       {song.track.artists[0].name}
                  </div>
                    </a >
                  </div>
              </div>
        </div>
      </td>

    <td><a className= 'song-name' href = {song.track.album.external_urls.spotify} target="_blank" rel="noopener noreferrer">{song.track.album.name}</a></td>
      <td ><div>{convertTime(song.played_at)}</div></td>
    </tr>


      );

      return (
        <table className="table ">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Album</th>
      <th scope="col">Time Played</th>
    </tr>
  </thead>
  <tbody>{items}</tbody>
  </table>


      );
    }
    render(){
        return (

            <div className="App hero3">
                <Toolbar/>
                <section  id="about" className="about hero2">
                <div className= 'hello'><h1>Your Recently Played Tracks</h1></div>
                <this.WordList words = {this.state.nowList.songs}/>
                </section>
                <Footbar/>
            </div>

        )
    }

}
export default History
