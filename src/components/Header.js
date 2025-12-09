import banner from '../assets/karaoke.jpg'
import '../styles/layout.css'
import '../styles/Header.css'
import { Link } from 'react-router-dom';


function Header({ user }) {
  return (
    <div className="app-header">
      <img src={banner} alt="Book My Mic" className='app-banner' />
      <div className="banner-overlay">
        <h1>BookMyMic</h1>
        <p>Votre créneau, votre show !</p>
        {user && (
          <Link to="/my-bookings">
            <button className="my-bookings-button">Mes réservations</button>
          </Link>
        )}
      </div>
    </div>

  );
}

export default Header