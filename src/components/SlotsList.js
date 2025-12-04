import { useState, useEffect } from "react";

function SlotsList({ onSelectSlot }) {
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const res = await fetch("http://localhost:3000/slots");
        const data = await res.json();
        setSlots(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des créneaux :", error);
      }
    };

    fetchSlots();
  }, []);

  return (
    <div>
      <h2>Créneaux disponibles</h2>
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
  );
}

export default SlotsList