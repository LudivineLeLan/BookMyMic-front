import banner from '../assets/karaoke.jpg';
import '../styles/layout.css';
import '../styles/Header.css';
import { Link } from 'react-router-dom';

function Header({ user, onLoginToggle, onLogout }) {
  return (
    <div className="app-header">
      <a href="/"><img src={banner} alt="Book My Mic" className='app-banner' /></a>
      <div className="banner-overlay">
        <a href="/">
          <h1>BookMyMic</h1>
        </a>
        <p>Votre créneau, votre show !</p>

        <div className="header-button">
          {!user && (
            <button className='auth-button' onClick={onLoginToggle}>Connexion / Inscription</button>
          )}

          {user && (
            <>
              <Link to="/mes-reservations">
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
