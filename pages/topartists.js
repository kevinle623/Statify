
import { Toolbar } from "../components/toolbar"

import Spotify from 'spotify-web-api-js'

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
        console.log(response)
        this.getUserOption(time)
        this.setState({
    
          nowList: {
            
            songs: response.items,
       
            
          }
          
        })
        // lst = "<ol style='list-style-type:none;'>"
        // var counter = 1

        //     for (let i of response.items) {
        //         lst += `<li><h4>${counter}. ${i.name}</h4><img src = ${i.images[0].url} class = "list-img"/></li>`;
        //         counter += 1
        //       }
        //       lst += "</ol>";
        //       document.getElementById("artistlist").innerHTML = lst;

      })
}

getUserOption(time) {
  if (time == 'short_term'){
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


WordList(props) {
    
    


  const words = props.words;
  const items = words.map((song, idx) =>
  <div class="col-lg-4 col-md-6 portfolio-item filter-app">
            <div class="portfolio-wrap">
              <img src={song.images[0].url} class="img-album img-fluid" alt=""/>
              <div class="portfolio-info">
                <h4>{idx + 1}. {song.name}</h4>
                <p>Followers: {(song.followers.total).toLocaleString()} </p>
                <div class="portfolio-links">
                  
                  <a href={song.external_urls.spotify} target="_blank" title="VISIT ON SPOTIFY"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-spotify" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z"/>
</svg></a>
                </div>
              </div>
            </div>
          </div>




    //     <div class="image col-md-3">
          
    //       <img class="image__img artist-img" src ={song.images[0].url}/>
    //       <div class="image__overlay image__overlay--blur">
    //     <a href = {song.external_urls.spotify} target="_blank"><div class="image__title">{idx + 1}. {song.name}</div></a>
      
    // </div>
        
        
        
    //     </div>
  

      // <li  class="list-group-item" key={idx}>
      //   {/* <button onClick = {() => this.getNowDisplay(1, song, song.artists[0])}> */}


      //                      <div class = 'container-fluid'>
      //                        <div class = 'row align-items-center row-list'>
      //                        <div class = 'num-list col-md-4'> 
                                
      //                        {idx +1}
                               
                                       
      //                            </div> 
      //                            <div class = 'col-md-1'> 
      //                             <a href = {song.external_urls.spotify}>
      //                            <img src = {song.album.images[0].url} class = 'list-img'/> 
      //                            </a>
                                        
      //                             </div> 
      //                                 <div class = 'col'> 
      //                                 <div class = 'song-detail'>
                                     
                                      
      //                                 <a href = {song.external_urls.spotify}><div class = 'song-name'> 
      //                                       {song.name} 
      //                                   </div> </a>
      //                                   <a href = {song.artists[0].external_urls.spotify}>
      //                                   <div class ='artist'> 
      //                                   {song.artists[0].name} 
      //                                   </div> 
      //                                   </a >
      //                                   </div> 
      //                                   </div>
      //                       </div>
      //                       </div>
                          
      //                     {/* </button> */}
        
        
 
      
  );
 

  return (
    <section id="portfolio" class="portfolio">

    <div class="container" data-aos="fade-up">

     

      <div class="row gy-4 portfolio-container" data-aos="fade-up" data-aos-delay="200">
        {items}
        </div>

      </div>

    </section>


    
     
    // <div class = 'container '>
    //   <div class="row row-cols-3 d-flex justify-content-center"> {items}
    //   </div>
      
    //   </div>

  );
}
      

    render() {
        return (
            <div className="App hero2">
            <Toolbar/>

            <section  id="about" class="about hero2">
                <div class ='hello'><h1>Your Top Artists </h1>
                <h3>({this.state.nowTime.message})</h3>
                <div class="hello btn-group" role="group" aria-label="Basic radio toggle button group">
                <button type="button" class="btn btn-outline-dark" onClick={() => this.getTopArtists('short_term')}>
                  Past Month
                </button>
                <button type="button" class="btn btn-outline-dark" onClick={() => this.getTopArtists('medium_term')}>
                  Past 6 Months
                </button>
                <button type="button" class="btn btn-outline-dark" onClick={() => this.getTopArtists('long_term')}>
                  All Time
                </button>




                </div>
                
                </div>

                <this.WordList words={this.state.nowList.songs}/>,


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
  
  export default Topartist