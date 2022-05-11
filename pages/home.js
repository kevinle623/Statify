import { Toolbar } from "../components/toolbar"
import Spotify from 'spotify-web-api-js'
import Image from 'next/image'
import React, { Component } from 'react'



const spotifyWebApi = new Spotify();

var username = ' '
var profile_pic = 'https://e7.pngegg.com/pngimages/178/595/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black-thumbnail.png'
var followers = ' '
var message = 'short_term'

var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = global.window && window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
export { hashParams, username }


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
            

          }

         


        
          
    
          
    
          
          
    
    
        }
        
      }
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
          console.log(response)
         
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
          console.log(response)
          this.setState({
      
            topArtist: {
              image: response.items[0].images[0].url,
              name: response.items[0].name,
              followers: (response.items[0].followers.total).toLocaleString(),
              link: response.items[0].external_urls.spotify,
              
  
            }
            
          })
         
  
        })
  }
    
      


    render () {
      
        return (
          
          
          
    
            <div className="App hero2">
            
           
            
              
           <Toolbar/>
               

                <section id="hero" className="hero d-flex align-items-center">

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

  <main id="main">
  
    <section id="about" className="about hero align-items-center">
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
                Followers: {this.state.topArtist.followers}
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
  
  export default Home