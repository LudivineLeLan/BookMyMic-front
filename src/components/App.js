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

  const handleSlotSelect = (slot) => setSelectedSlot(slot);
  const handleBooked = () => setSelectedSlot(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser(token);
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setUser(token);
    setShowAuth(false);
  };

  return (
    <Router>
      <Header user={user} />

      <Routes>
        <Route
          path="/"
          element={
            <div className="app-container">

              {!user && (
                <button
                  className="button-booking"
                  onClick={() => setShowAuth(prev => !prev)}
                >
                  Connexion / Inscription
                </button>
              )}

              {showAuth && !user && (
                <Authentification onLogin={handleLogin} />
              )}

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

        <Route
          path="/my-bookings"
          element={<MyBookings user={user} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
