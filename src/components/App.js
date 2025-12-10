import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Authentification from "./Authentification";
import Header from "./Header";
import SlotsList from "./SlotsList";
import BookingForm from "./BookingForm";
import CalendarView from "./CalendarView";
import MyBookings from "./MyBookings";

function App() {
  const [user, setUser] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser(token);
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setUser(token);
    setShowAuth(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const handleSlotSelect = (slot) => setSelectedSlot(slot);
  const handleBooked = () => setSelectedSlot(null);

  return (
    <Router>
      <Header
        user={user}
        onLoginToggle={() => setShowAuth(prev => !prev)}
        onLogout={handleLogout}
      />

      {showAuth && !user && (<div className="auth-modal-overlay">
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
                  user={user}
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

        <Route path="/my-bookings" element={<MyBookings user={user} />} />
      </Routes>
    </Router>
  );
}

export default App;
