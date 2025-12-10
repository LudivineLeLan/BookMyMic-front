import banner from '../assets/karaoke.jpg';
import '../styles/layout.css';
import '../styles/Header.css';
import { Link } from 'react-router-dom';

function Header({ user, onLoginToggle, onLogout }) {
  return (
    <div className="app-header">
      <img src={banner} alt="Book My Mic" className='app-banner' />
      <div className="banner-overlay">
        <h1>BookMyMic</h1>
        <p>Votre créneau, votre show !</p>

        <div className="header-button">
          {!user && (
            <button className='auth-button' onClick={onLoginToggle}>Connexion / Inscription</button>
          )}

          {user && (
            <>
              <Link to="/my-bookings">
                <button className="my-bookings-button">Mes réservations</button>
              </Link>
              <button className='auth-button' onClick={onLogout}>Déconnexion</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
