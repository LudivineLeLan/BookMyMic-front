import { useEffect, useState } from "react";
import '../styles/MyBookings.css'

function MyBookings({ token }) {
  const [bookings, setBookings] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!token) return;
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL}/user/me/bookings`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Impossible de récupérer les réservations");
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookings();
  }, [token]);

  const handleCancel = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/user/booking/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Impossible d'annuler la réservation");

      setBookings(prev => prev.filter(booking => booking.id !== id));

      setMessage("Réservation annulée");
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      console.error(error);
      setMessage(error.message);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div>
      <h2>Mes réservations</h2>
      {message && <p className="info-message">{message}</p>}
      {bookings.length === 0 ? (
        <p>Aucune réservation pour l'instant</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={bookings.id}>
              {new Date(bookings.Slot.date).toLocaleString()} - {bookings.user_name}
              <span className="cancel-emoji" title="Annuler" onClick={() => handleCancel(booking.id)}>❌</span>
            </li>
          ))}
        </ul>
      )}
      <a href="/"><button className="back-button">Retour à l'accueil</button></a>
    </div>
  );
}

export default MyBookings;
