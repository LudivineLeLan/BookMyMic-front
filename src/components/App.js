import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentification from "./Authentification";
import Header from "./Header";
import SlotsList from "./SlotsList";
import BookingForm from "./BookingForm";
import CalendarView from "./CalendarView";
import MyBookings from "./MyBookings";


function App() {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    if (storedToken) setToken(storedToken);
    if (storedUserId) setUserId(storedUserId);
  }, []);


  const handleLogin = (token, id) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userId", id);
    setToken(token);
    setUserId(id);
    setShowAuth(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const handleSlotSelect = (slot) => setSelectedSlot(slot);
  const handleBooked = () => setSelectedSlot(null);

  return (
    <Router>
      <Header
        user={token}
        onLoginToggle={() => setShowAuth(prev => !prev)}
        onLogout={handleLogout}
      />

      {showAuth && !token && (<div className="auth-modal-overlay">
        <Authentification onLogin={handleLogin} onClose={() => setShowAuth(false)} /></div>)}

      <Routes>
        <Route
          path="/"
          element={
            <div className="app-container">
              <CalendarView onDateChange={setSelectedDate} />

              {selectedSlot ? (
                <BookingForm
                  slot={selectedSlot}
                  onBooked={handleBooked}
                  onCancel={handleBooked}
                  token={token}
                />
              ) : (
                <SlotsList
                  onSelectSlot={handleSlotSelect}
                  selectedDate={selectedDate}
                />
              )}
            </div>
          }
        />

        <Route
          path="/mes-reservations"
          element={
            token ? (
              <MyBookings token={token} />
            ) : (
              <p>Chargement des réservations…</p>
            )
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
