import {useRouter } from 'next/router';
import styles from '../styles/Toolbar.module.css'


export const Toolbar = () => {
    const router = useRouter();


    return (
    
        <header id="header" class="header">
    <div class="container-fluid container-xl d-flex align-items-center justify-content-between">

      <a onClick={() => router.push('/home') } class="logo d-flex align-items-center">
        Statify
      </a>
      <nav class="navbar navbar-expand-lg navbar-light ">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
 
     
    <div class='hello click' onClick={() => router.push('/home')}>
              Home
      </div >

      <div class='hello click' onClick={() => router.push('/topsongs')}>
      Tracks
      </div >
      <div class='hello click' onClick={() => router.push('/topartists')}>
      Artists
      </div >

      <div class='hello click' onClick={() => router.push('/topgenres')}>
      Genres
      </div >

      <div class='hello click' onClick={() => router.push('/history')}>
      Recently Played
      </div >
      
   
      
    </div>
  </div>
</nav>
      

      {/* <nav id="navbar" class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
        <div class='hello' onClick={() => router.push('/home')}>
              Home
      </div >
        </li>
        <li class="nav-item">
        <div class='hello' onClick={() => router.push('/topsongs')}>
      Tracks
      </div >
        </li>
        <li class="nav-item">
        <div class='hello' onClick={() => router.push('/topartists')}>
      Artists
      </div >
        </li>
        <li class="nav-item">
        <div class='hello' onClick={() => router.push('/topgenres')}>
      Genres
      </div >
        </li>
        <li class="nav-item">
        <div class='hello' onClick={() => router.push('/history')}>
      Recently Played
      </div >
        </li>
      </ul>
      
    </div>
  </div>
      </nav> */}
      <a onClick={() => router.push('/') } class="logo align-items-center">
      <i class="gg-log-out"></i></a>

    </div>
  </header>

        
        
        // <div className = {styles.main}> 
        
        
        //     <div onClick={() => router.push('/home')}>
        //         Home
        //     </div >
        //     <div onClick={() => router.push('/topsongs')}>
        //         Tracks
        //     </div>
        //     <div onClick={() => router.push('/topartists')}>
        //         Artists
        //     </div>
        //     <div onClick={() => router.push('/topgenres')}>
        //         Genres
        //     </div>
           
        //     <div onClick={() => router.push('/history')}>
        //         Recently Played
        //     </div>
            
            
        // </div>
   
    );

};