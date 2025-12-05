import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

export default function CalendarView({ onDateChange }) {
  const [date, setDate] = useState(new Date());

  const handleChange = (date) => {
    setDate(date);
    onDateChange(date);
  };

  return (
    <div className="calendar-container">
      <Calendar
        onChange={handleChange}
        value={date}
      />
    </div>
  );
}
