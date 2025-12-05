import { useState, useEffect } from "react";

function SlotsList({ onSelectSlot, selectedDate }) {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const getAllSlots = async () => {
      try {
        const res = await fetch("http://localhost:3000/slots");
        const data = await res.json();
        const filtered = data.filter(slot =>
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
      <ul className="list">
        {slots.length === 0 && <li>Aucun créneau disponible</li>}
        {slots.map(slot => (
          <li key={slot.id} className="list-item">
            {new Date(slot.date).toLocaleString()}
            {slot.available ? (
              <button className="button-booking" onClick={() => onSelectSlot(slot)}>
                Réserver
              </button>
            ) : (
              <span>Indisponible</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SlotsList;