import { useState, useEffect } from "react";
import '../styles/SlotsList.css'


function SlotsList({ onSelectSlot, selectedDate }) {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const getAllSlots = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/slots`);
        const data = await res.json();
        const filtered = data.filter(
          slot =>
            new Date(slot.date).toDateString() === selectedDate.toDateString()
        );
        setSlots(filtered);
      } catch (error) {
        console.error("Erreur lors de la récupération des créneaux :", error);
      }
    };

    getAllSlots();
  }, [selectedDate]);

  return (
    <div className="card">
      <h2 className="section-title">Créneaux disponibles</h2>
      <div>
        <ul className="list">
          {slots.map(slot => {
            const slotDate = new Date(slot.date);
            const formattedDate = slotDate.toLocaleDateString([], {
              year: "numeric",
              month: "2-digit",
              day: "2-digit"
            });
            const formattedTime = slotDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit"
            });

            return (
              <li key={slot.id} className="list-item">
                {formattedDate} {formattedTime}{" "} {slot.available ? (
                  <button className="button-booking" onClick={() => onSelectSlot(slot)}> Réserver </button>) : (<span>Indisponible</span>)
                }
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default SlotsList;
