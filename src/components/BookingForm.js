import { useState, useRef } from "react";
import '../styles/BookingForm.css'

function BookingForm({ slot, onBooked, onCancel }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const messageRef = useRef(null);

  useEffect(() => {
    if (successMessage && messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [successMessage]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/bookings`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userName: name,
            userEmail: email,
            slotId: slot.id
          })
        });

      if (!response.ok) throw new Error("Impossible de réserver le créneau");
      setSuccessMessage("Réservation validée ! 🎶");
      setName("");
      setEmail("");
      setTimeout(() => {
        onBooked();
      }, 2500);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Réserver le créneau : {new Date(slot.date).toLocaleString()}</h3>
      <input
        type="text" placeholder="Votre nom" value={name} onChange={event => setName(event.target.value)} required />
      <input type="email" placeholder="Votre email" value={email} onChange={event => setEmail(event.target.value)} required />
      <button type="submit" className="button-booking">Réserver</button>
      <button type="button" className="button-cancel" onClick={onCancel}>Annuler</button>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </form>

  );
}

export default BookingForm