import banner from '../assets/karaoke.jpg'
import '../styles/layout.css'
import '../styles/Header.css'


function Header() {
  return (
    <div className="app-header">
      <img src={banner} alt="Book My Mic" className='app-banner' />
      <div className="banner-overlay">
        <h1>BookMyMic</h1>
        <p>Votre créneau, votre show !</p>
      </div>
    </div>

  );
}

export default Header