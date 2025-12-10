import { useEffect, useState } from "react";

function MyBookings({ userId, token }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `https://bookmymic-back.onrender.com/user/${userId}/bookings`,
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
  }, [userId, token]);

  return (
    <div>
      <h2>Mes réservations</h2>
      {bookings.length === 0 ? (
        <p>Aucune réservation pour l'instant</p>
      ) : (
        <ul>
          {bookings.map((bookings) => (
            <li key={bookings.id}>
              {new Date(bookings.Slot.date).toLocaleString()} - {bookings.user_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyBookings;
