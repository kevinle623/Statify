import { Toolbar } from "../components/toolbar"
import Spotify from 'spotify-web-api-js'

import React, { Component } from 'react'


import { hashParams, username } from './home.js'

const spotifyWebApi = new Spotify();
var lst=[]

function convertTime(time) {
  var isoDateTime = new Date(time);
  const stime = new Date(time).toLocaleTimeString('en',
                 { timeStyle: 'short', hour12: false, timeZone: 'EST' });

  var localDateTime = isoDateTime.toLocaleDateString() + " " + stime;

  return (localDateTime)
}









class History extends Component {
    constructor() {
        super();
        const params = hashParams;
    
        if (params.access_token){
          spotifyWebApi.setAccessToken(params.access_token)
          this.getHistorySongs()
        }
        this.state ={
          
          loggedIn: params.access_token ? true : false,
          nowList: {
          
          songs: [],
        },

      }
        
    
        
    
        
    
    
        
          
    
          
    
          
          
   
    
        
        
      }
      
      getHistorySongs() {
        spotifyWebApi.getMyRecentlyPlayedTracks({limit: 50})
          .then((response) => {
            console.log(response)
            this.setState({
    
              nowList: {
                
                songs: response.items,
           
                
              }
              
            })
            
            
            // lst = "<ol style='list-style-type:none;'>"
         
    
            // for (let i of response.items) {
                
            //     lst += `<li><div><h4>${i.track.name} by ${i.track.artists[0].name} | ${i.played_at}</h4> <img src = ${i.track.album.images[0].url} class = "list-img"/>    </div></li>`;
          
                
            //   }
            //   lst += "</ol>";
            //   document.getElementById("historylist").innerHTML = lst;
    
    
    
    
          })
    }

    WordList(props) {
    
    


      const words = props.words;
      const items = words.map((song, idx) =>
      <tr>
      <th scope="row" class = 'num-history'>{idx + 1}</th>
      <td>
        <div class="container">
            <div class="hello row align-items-center">
                <div class="hello col-md-3">
                <a href = {song.track.external_urls.spotify} target="_blank">
                              <img src = {song.track.album.images[0].url} class = 'list-img'/> 
                      </a>
                  </div>
            <div class="hello col song-detail">
            
                                     
                                      
                                  <a href = {song.track.external_urls.spotify} target="_blank"><div class = 'song-name'> 
                                    {song.track.name} 
                                    </div> </a>
                                      <a href = {song.track.artists[0].external_urls.spotify} target="_blank">
                                        <div class ='artist'> 
                                           {song.track.artists[0].name} 
                                      </div> 
                                        </a >
                                      </div>
              
          </div>
          </div>
  </td>
    <a href = {song.track.album.external_urls.spotify} target="_blank"><td class = 'song-name'>{song.track.album.name}</td></a>
      <td >{convertTime(song.played_at)}</td>
    </tr>


      );

      return (
        <table class="table ">
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
            
            <div className="App hero2">
                <Toolbar/>
                <section  id="about" class="about hero2">
                <div class = 'hello'><h1>Your Recently Played Tracks</h1></div>
                <this.WordList words = {this.state.nowList.songs}/>
                </section>
                <footer id="footer" class="footer"> 
<div class="container">
      <div class="copyright">
        &copy; Copyright <strong><span>Statify</span></strong>. All Rights Reserved.
      </div>
      
      <div class="credits">
  
        Developed by   <a href="https://github.com/tahazaryab" target="_blank"> Taha Zaryab  </a>  and  <a href="https://github.com/kevinle623" target="_blank">Kevin Le  </a>
      </div>
    </div>

</footer>
            </div>

        )
    }
    
}
export default History