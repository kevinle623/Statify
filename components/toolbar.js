import {useRouter } from 'next/router';
import styles from '../styles/Toolbar.module.css'
import Image from 'next/image'

export const Toolbar = () => {
    const router = useRouter();


    return (
    
        <header id="header" className="header">
    <div className="container-fluid container-xl d-flex align-items-center justify-content-between">

      <a onClick={() => router.push('/home') } className="logo d-flex align-items-center">
        Statify
      </a>
      <nav className="navbar navbar-expand-lg navbar-light ">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
 
     
    <div className='hello click' onClick={() => router.push('/home')}>
              Home
      </div >

      <div className='hello click' onClick={() => router.push('/topsongs')}>
      Tracks
      </div >
      <div className='hello click' onClick={() => router.push('/topartists')}>
      Artists
      </div >

      <div className='hello click' onClick={() => router.push('/topgenres')}>
      Genres
      </div >

      <div className='hello click' onClick={() => router.push('/history')}>
      Recently Played
      </div >
      
   
      
    </div>
  </div>
</nav>
      

     
      <a onClick={() => router.push('/home') } className="logo align-items-center">
      <i className="gg-log-out"></i></a>

    </div>
  </header>

        
        
      
   
    );

};