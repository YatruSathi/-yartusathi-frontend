import React, { useEffect, useState } from "react";
import { fetchEvents } from "../services/api";

export default function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function loadEvents() {
      const data = await fetchEvents();
      setEvents(data);
    }
    loadEvents();
  }, []);

  return (
    <div>
      <h1>Events</h1>
      {events.map((ev) => (
        <div key={ev.id}>
          <h3>{ev.title}</h3>
          <p>{ev.description}</p>
        </div>
      ))}
    </div>
  );
}
