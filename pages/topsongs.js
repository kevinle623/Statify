
import { Toolbar } from "../components/toolbar"

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












        // lst = "<ol >"
        // var counter = 1


        // for (let i of response.items) {
        //     // lst += `<li><a onclick='thisnewwin()'><div class = 'song'><h4>${counter}. ${i.name} by ${i.artists[0].name}</h4> <img src = ${i.album.images[0].url} class = "list-img"/>   </div></a></li>`;
        //     lst += `<li>
        //               <button onClick = ${() => this.getTopSongs('short_term')}>
        //                 <div class = 'song'> 
        //                      <div class = 'song-img'> 
        //                             <img src = ${i.album.images[0].url} class = "list-img"/> 
        //                       </div> 
        //                 <div class = 'song-detail'> 
        //                       <div class = 'song-name'> 
        //                             ${i.name} 
        //                       </div> 
        //                       <div class ='artist'> 
        //                             ${i.artists[0].name} 
        //                       </div>
        //                 </div>
        //                 </div>
        //               </button>
        //             </li>`;
        //     counter += 1;
        //   }
        //   lst += "</ol>";
        //   document.getElementById("tracklist").DangerouslySetInnerHTML = lst;




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
    




      <div>
    
        <div class="mx-auto card mb-3">
          <div class="row-margin row align-items-center g-0 ">
            <div class="portfolio-wrap img-margin col-md-2">
              
                <img src={song.album.images[0].url} class="img-margin img-fluid rounded-start" alt="..." />
                <a href= {song.external_urls.spotify} target="_blank"><div class="portfolio-info">
               <h1>{idx + 1}</h1>
          
                
              </div></a>
             
            </div>
            <div class="song-info-marg col-md-9">
              <div class="song-info-marg card-body">
                <a href={song.external_urls.spotify} target="_blank">
                  <h5 class="card-title">{song.name} </h5>
                </a>
                <a href={song.artists[0].external_urls.spotify} target="_blank">
                  <p class="card-text">{song.artists[0].name} </p>
                </a>

              </div>
            </div>
          </div>
        </div>
      </div>

      //   <li  class="list-group-item" key={idx}>
      //   <div class="card mb-3" style="max-width: 540px;">
      //   <div class="row g-0">
      //     <div class="col-md-4">
      //       <img src={song.album.images[0].url} class="img-fluid rounded-start" />
      //     </div>
      //     <div class="col-md-8">
      //       <div class="card-body">
      //         <h5 class="card-title">Card title</h5>
      //         <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      //         <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      // </li>



      // <li  class="list-group-item" key={idx}>
      //   {/* <button onClick = {() => this.getNowDisplay(1, song, song.artists[0])}> */}


      //                      <div class = 'container-fluid'>
      //                        <div class = 'row align-items-center row-list'>
      //                        <div class = 'num-list col-md-4'> 

      //                        {idx +1}


      //                            </div> 
      //                            <div class = 'col-md-1'> 
      //                             <a href = {song.external_urls.spotify} target="_blank">
      //                            <img src = {song.album.images[0].url} class = 'list-img'/> 
      //                            </a>

      //                             </div> 
      //                                 <div class = 'col'> 
      //                                 <div class = 'song-detail'>


      //                                 <a href = {song.external_urls.spotify} target="_blank"><div class = 'song-name'> 
      //                                       {song.name} 
      //                                   </div> </a>
      //                                   <a href = {song.artists[0].external_urls.spotify} target="_blank">
      //                                   <div class ='artist'> 
      //                                   {song.artists[0].name} 
      //                                   </div> 
      //                                   </a >
      //                                   </div> 
      //                                   </div>
      //                       </div>
      //                       </div>

      // {/* </button> */}



      // </li>

    );


    return (


      <section id="portfolio" class="portfolio">

      <div class="container" data-aos="fade-up">
      
        {items}
        </div>

    </section>

   



    );
  }

  render() {
    return (
      <div className="App hero2">
        <Toolbar />
        <section  id="about" class="about hero2">

        <div class = 'hello '><h1>Your Top Tracks</h1>
          <h3>({this.state.nowTime.message})</h3>

          <div class="hello btn-group" role="group" aria-label="Basic radio toggle button group">
            <button type="button" class="btn btn-outline-dark" onClick={() => this.getTopSongs('short_term')}>
              Past Month
            </button>
            <button type="button" class="btn btn-outline-dark" onClick={() => this.getTopSongs('medium_term')}>
              Past 6 Months
            </button>
            <button type="button" class="btn btn-outline-dark" onClick={() => this.getTopSongs('long_term')}>
              All Time
            </button>
          </div>
        </div>



        <this.WordList words={this.state.nowList.songs} />,


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

export default Topsongs