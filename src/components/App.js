import { useState } from "react";
import Header from "./Header";
import SlotsList from "./SlotsList";
import BookingForm from "./BookingForm";
import CalendarView from "./CalendarView";

function App() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleSlotSelect = (slot) => setSelectedSlot(slot);
  const handleBooked = () => setSelectedSlot(null);

  return (
    <div className="app-container">
      <Header />
      <CalendarView onDateChange={setSelectedDate} />
      <p className="calendar-note"> Réservez vos créneaux jusqu'à 3 mois à l'avance ! </p>
      {selectedSlot ? (
        <BookingForm slot={selectedSlot} onBooked={handleBooked} onCancel={() => setSelectedSlot(null)} />
      ) : (
        <SlotsList selectedDate={selectedDate} onSelectSlot={handleSlotSelect} />
      )}
    </div>
  );
}

export default App;
