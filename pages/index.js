import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {useRouter } from 'next/router';


const CLIENT_ID = "e80f29b550fb4604bfd9d4fd0208405d"; 
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/home";
const SPACE_DELIMITER = "%20";
const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "playlist-read-private",
  "user-read-private",
  "user-read-email",
  "user-top-read",
  "user-read-recently-played",



];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);


const handleLogin = () => {
  window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
};


function Login() {

  return (
    
    <div className="App">
      
       <section id="hero" className="hero d-flex align-items-center">

<div className="container">
  <div className="row">
    <div className="col-lg-12 d-flex flex-column justify-content-center">
      <h1 data-aos="fade-up">Statify</h1>
      <h2 data-aos="fade-up" data-aos-delay="400">Your one stop shop to track your Spotify!</h2>
      <div className= 'hello' data-aos="fade-up" data-aos-delay="600">
        <div className="hello text-center text-lg-centre">
          
          <a onClick={handleLogin} className="btn-get-started  align-items-center justify-content-center align-self-center">
            <span>  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-spotify" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z"/>
</svg> CONNECT WITH SPOTIFY</span>
            <i className="bi bi-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
    
  </div>
</div>

</section>
<footer id="footer" className="footer"> 
<div className="container ">
      <div className="hello copyright">
        &copy; Copyright <strong><span>Statify</span></strong>. All Rights Reserved.
      </div>
      
      <div className="hello credits">
  
        Developed by   <a href="https://github.com/tahazaryab" target="_blank" rel="noopener noreferrer"> Taha Zaryab  </a>  and  <a href="https://github.com/kevinle623"  target="_blank" rel="noopener noreferrer">Kevin Le  </a>
      </div>
    </div>

</footer>

      
      
      
      
    </div>


    
  )
}

export default Login
