import {useRouter } from 'next/router';
import styles from '../styles/Toolbar.module.css'
import Image from 'next/image'



export const Footbar = () => {
    const router = useRouter();


    return (

    <div className="container">
      <footer className="py-3 my-4">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
          <li className="nav-item"><a onClick={() => router.push('/home')} className="nav-link px-2 textfoot">Home</a></li>
          <li className="nav-item"><a onClick={() => router.push('/topsongs')} className="nav-link px-2 textfoot">Tracks</a></li>
          <li className="nav-item"><a onClick={() => router.push('/topartists')} className="nav-link px-2 textfoot">Artists</a></li>
          <li className="nav-item"><a onClick={() => router.push('/topgenres')} className="nav-link px-2 textfoot">Genres</a></li>
          <li className="nav-item"><a onClick={() => router.push('/history')} className="nav-link px-2 textfoot">Recently Played</a></li>

        </ul>
        <p className="text-center ">&copy; Copyright <strong><span>Statify</span></strong>. All Rights Reserved.</p>
        <p className="text-center ">

            Developed by   <a className= 'names' href="https://github.com/tahazaryab" target="_blank" rel="noopener noreferrer"> <strong>Taha Zaryab</strong>  </a>  and  <a className= 'names'  href="https://github.com/kevinle623" target="_blank" rel="noopener noreferrer"> <strong>Kevin Le</strong>  </a>
            </p>
      </footer>
    </div>
    );
};
