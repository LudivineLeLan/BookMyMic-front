import { useState } from "react";
import SlotsList from "./SlotsList";
import BookingForm from "./BookingForm";

function App() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleBooked = () => {
    setSelectedSlot(null);
  };

  return (
    <div className="booking-container">
      <h1>BookMyMic</h1>
      {selectedSlot ? (
        <BookingForm slot={selectedSlot} onBooked={handleBooked} />
      ) : (
        <SlotsList onSelectSlot={handleSlotSelect} />
      )}
    </div>
  );
}

export default App;
