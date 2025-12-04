import { useState } from "react";

function BookingForm({ slot, onBooked }) {
  const [name, setName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName: name,
          slotId: slot.id
        })
      });

      if (!response.ok) throw new Error("Impossible de réserver le créneau");

      onBooked();
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Réserver le créneau : {new Date(slot.date).toLocaleString()}</h3>
      <input
        type="text"
        placeholder="Ton nom"
        value={name}
        onChange={event => setName(event.target.value)}
        required
      />
      <button type="submit">Réserver</button>
    </form>
  );
}

export default BookingForm