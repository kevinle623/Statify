import { Toolbar } from "../components/toolbar"
import { Footbar } from "../components/footer"
import Spotify from 'spotify-web-api-js'
import Image from 'next/image'
import React, { Component } from 'react'

const cohere = require("cohere-ai");
const spotifyWebApi = new Spotify();
cohere.init('qikBdfl2vVYSrm5Qw4CCQ4FJoiYBUn9MF00xmT64');


var username = ' '
var profile_pic = 'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png'
var followers = ' '
var message = 'medium_term'

var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = global.window && window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
export { hashParams, username, profile_pic }


class Home extends Component {
    constructor() {
        super();
        const params = hashParams;

        if (params.access_token){
          spotifyWebApi.setAccessToken(params.access_token)
          this.getUserInfo()
          this.getNowPlaying()
          this.getTopStats(message)
        }

        this.state ={

          loggedIn: params.access_token ? true : false,

          nowPlaying: {
            name: 'Currently not playing any tracks... ',
            image: ''
          },

          userChoice: {
            time: ''
          },

          topSong: {
            name: '',
            artist: '',
            image: '',
            link: '',
          },
          nowTime: {

            message: 'Past Month'
          },

          topArtist: {
            image: '',
            name: '',
            followers: 0,
            link: '',
            genre: '',

          },

          generatedStory: ''
        }
      }
      generateStory = async () => {
        try {
          const { name, genre } = this.state.topArtist;
          const { name: songName, artist } = this.state.topSong;
          const { followers } = this.state;
      
          const prompt = `John has 50 followers, his favourite artist is Cocteau Twins which has the genre alternative pop. His favourite song is Love Lost by Mac Miller. When John opens Spotify he sees the following description of his profile: Your Spotify persona is the Alternative Enthusiast! With 50 followers, you're clearly well-connected and have a knack for discovering unique sounds. Cocteau Twins' alternative pop style perfectly resonates with your musical taste, and it's no surprise that they're your favourite artist! Despite that, your top song is Love Lost by Mac Miller, adding an intriguing twist to your eclectic music preferences. Keep exploring and sharing those offbeat tracks with your followers! Vladimir has 5 followers, his favourite artist is Taylor Swift, which has the genre of American pop. His favourite song is Blue Savannah by Erasure. When Vladimir opens Spotify he sees the following description of his profile: Your Spotify persona is the Dreamy Explorer, and you keep your musical findings well guarded for you and your few followers. You're also a big fan of Talyor Swift (swifties unite), but in contrast, your top song is Blue Savannah by Erasure! That's a throwback, and it really makes you feel like a wilderness Explorer. ${username} has ${followers} followers, and their favourite artist is ${name}, which has the genre ${genre}. Their favourite song is ${songName} by ${artist}. When ${username} opens Spotify they see the following description of their profile: `;
      
          const response = await cohere.generate({
            model: 'command-light',
            prompt: prompt,
            max_tokens: 300,
            temperature: 0.7,
            k: 0,
            stop_sequences: [],
            return_likelihoods: 'NONE'
          });
      
          const generatedStory = response.body.generations[0].text;
          this.setState({ generatedStory });
          console.log(prompt);
        } catch (error) {
          console.error('Error generating story:', error);
        }
      };

      getNowPlaying(){
        spotifyWebApi.getMyCurrentPlaybackState()
          .then((response) => {
            try {
              this.setState({
                nowPlaying: {
                  name: response.item.name + ' by ' + response.item.artists[0].name,
                  image: response.item.album.images[0].url,
                }
              }
              )
            }
            catch(err) {
              this.setState({

                nowPlaying: {

                  name: 'Currently not playing any tracks... ',
                  image: '',
                }
              }
              )
            }
            }
          )
      }

      getUserInfo() {

        spotifyWebApi.getMe()
          .then((response) => {

            try {
              username = response.display_name
              profile_pic = response.images[0].url
              followers = response.followers.total
            }
            catch(err){
              username = response.display_name
              profile_pic = 'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png'
              followers = response.followers.total
            }
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

      getTopStats(time) {

            this.getUserOption(time)
            this.getTopSongs(time)
            this.getTopArtists(time)
      }

    getTopSongs(time) {
      spotifyWebApi.getMyTopTracks({ limit: 50, time_range: time })
        .then((response) => {

          this.setState({

            topSong: {
              name: response.items[0].name,
              artist: response.items[0].artists[0].name,
              image: response.items[0].album.images[0].url,
              link: response.items[0].external_urls.spotify,

            },
          }
          )
        })
    }
    getTopArtists(time) {
      spotifyWebApi.getMyTopArtists({limit: 50, time_range: time})
        .then((response) => {

          this.setState({

            topArtist: {
              image: response.items[0].images[0].url,
              name: response.items[0].name,
              followers: (response.items[0].followers.total).toLocaleString(),
              link: response.items[0].external_urls.spotify,
              genre: response.items[0].genres[0]
            }
          })
        })
  }

    render () {
        return (

    <div className="App hero3">
    <Toolbar/>
    <section id="hero" className="splash-page d-flex align-items-center">

    <div className="container">
      <div className="row">
        <div className=" col-lg-6 d-flex flex-column justify-content-center">
          <h1 data-aos="fade-up">Welcome Back { username }!</h1>
          <div className='hello'>
                          <img className= 'profile-pic' src = {profile_pic}/>
                        </div>
                        <div><h4>Followers: {followers}</h4></div>
          <h2 data-aos="fade-up" data-aos-delay="400">Take a look behind the curtain of your Spotify music.</h2>
          <div className="hello" data-aos="fade-up" data-aos-delay="600">
            <div className=" hello text-center">
              <a href="#about" className="btn-get-started  align-items-center justify-content-center align-self-center">
                <span>OVERVIEW</span>

              </a>
            </div>
          </div>
        </div>



        <div className="col-lg-6 d-flex flex-column justify-content-center " data-aos="zoom-out" data-aos-delay="200">
        <h1 data-aos="fade-up"> Now Playing: </h1>



<div>
  <img src= {this.state.nowPlaying.image} style= {{width: 200}}/>
</div>
<h2 data-aos="fade-up" data-aos-delay="400">{ this.state.nowPlaying.name }</h2>
<div className= " hello" data-aos="fade-up" data-aos-delay="600">
<div className="hello text-center ">
<a onClick={() => this.getNowPlaying()} className="btn-get-started align-items-center justify-content-center align-self-center">
<span>CHECK NOW PLAYING</span>
</a>
</div>
</div>


        </div>
      </div>
    </div>
  </section>

  <div className= 'statify-ai'><h1 className= 'helloLarge' data-aos="fade-up">Statify ai</h1>
        <div className="spotify-story-div align-items-center">
          <a onClick={() => this.generateStory()} className="btn-get-started align-items-center justify-content-center align-self-center">
            <span>SEE YOUR UNIQUE BIOGRAPHY</span>
          </a>
          {this.state.generatedStory && ( // Conditional rendering based on this.state.generatedStory
            <div className="spotify-story-text align-items-center justify-content-center align-self-center">
              <h2>{this.state.generatedStory}</h2>
            </div>
          )}
        </div>
    </div>


  <main id="main">
        
    <section id="about" className="about hero2 align-items-center">
    <div className= 'hello'><h1 data-aos="fade-up">Your Favourites</h1>
    <h3>({this.state.nowTime.message})</h3>

               <div className="hello btn-group" role="group" aria-label="Basic radio toggle button group">
               <button type="button" className="btn btn-outline-dark" onClick={() => this.getTopStats('short_term')}>
                 Past Month
               </button>
               <button type="button" className="btn btn-outline-dark" onClick={() => this.getTopStats('medium_term')}>
                 Past 6 Months
               </button>
               <button type="button" className="btn btn-outline-dark" onClick={() => this.getTopStats('long_term')}>
                 All Time
               </button>
               </div></div>

      <div className="container" data-aos="fade-up">
        <div className="hello row gx-0">

          <div className="hello col-lg-9 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">
            <div className="content">
              <h3>Your favourite artist</h3>
              <h2>{this.state.topArtist.name}</h2>
              <p>
                Genre: {this.state.topArtist.genre}
              </p>
              <div className="hello text-center text-lg-center">
                <a href={this.state.topArtist.link} target="_blank" rel="noopener noreferrer" className="btn-get-started  align-items-center justify-content-center align-self-center">
                  <span>VISIT ON SPOTIFY</span>
                  <i className="bi bi-arrow-right"></i>
                </a>

              </div>
            </div>
          </div>

          <div className="hello col-lg-2 d-flex align-items-center" data-aos="zoom-out" data-aos-delay="200">
            <img src={this.state.topArtist.image} className="img-fluid" alt=""/>
          </div>

        </div>
      </div>
      <div className="container" data-aos="fade-up">
        <div className="hello row gx-0">
        <div className="hello col-lg-2 d-flex align-items-center" data-aos="zoom-out" data-aos-delay="200">
            <img src={this.state.topSong.image} className="img-fluid" alt=""/>

          </div>

          <div className="hello col-lg-9 d-flex flex-column justify-content-center" data-aos="fade-up" data-aos-delay="200">
            <div className="content">
              <h3>Your favourite track</h3>
              <h2>{this.state.topSong.name}</h2>
              <p>
              {this.state.topSong.artist}
              </p>
              <div className="hello text-center text-lg-center">
                <a href={this.state.topSong.link} target="_blank" rel="noopener noreferrer" className="btn-get-started  align-items-center justify-content-center align-self-center">
                  <span>LISTEN ON SPOTIFY</span>

                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </main>
    <Footbar/>
    </div>

      )
    }
  }

  export default Home
