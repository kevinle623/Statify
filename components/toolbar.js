import {useRouter } from 'next/router';
import styles from '../styles/Toolbar.module.css'
import Image from 'next/image'

import { profile_pic } from '../pages/home.js'

export const Toolbar = () => {
    const router = useRouter();

    return (
      <div className="container">
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4">
          <a onClick={() => router.push('/home') } className="logos d-flex align-items-center">
          Statify
          </a>
          <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
            <li><div className='hello click' onClick={() => router.push('/home')}>
              Home
            </div ></li>
            <li><div className='hello click' onClick={() => router.push('/topsongs')}>
              Tracks
            </div ></li>
            <li><div className='hello click' onClick={() => router.push('/topartists')}>
              Artists
            </div ></li>
            <li><div className='hello click' onClick={() => router.push('/topgenres')}>
              Genres
            </div ></li>
            <li><div className='hello click' onClick={() => router.push('/history')}>
              Recently Played
            </div ></li>
          </ul>

          <div className="col-md-1 text-end">
          <div className="align-items-center">

        <div className="flex-shrink-0 dropdown">
          <a href="#" className="d-block link-dark text-decoration-none dropdown-toggle" id="dropdownUser2" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={profile_pic} alt="" width="32" height="32" className="rounded-circle"/>
          </a>
          <ul className="dropdown-menu text-small shadow" aria-labelledby="dropdownUser2">
            <li><a className="dropdown-item click" onClick={() => router.push('/home#') }>Profile</a></li>
            <li><a className="dropdown-item click" onClick={() => router.push('/') }>Sign out</a></li>
          </ul>
        </div>
      </div>
          </div>
        </header>
        </div>
    );
};
