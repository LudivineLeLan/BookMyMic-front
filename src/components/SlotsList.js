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
      <div>
        <ul>
          {slots.map(slot => (
            <li key={slot.id}>
              {new Date(slot.date).toLocaleString()}{" "}
              {slot.available ? (
                <button onClick={() => onSelectSlot(slot)}>Réserver</button>
              ) : (
                "Indisponible"
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SlotsList;
