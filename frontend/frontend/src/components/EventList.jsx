// /frontend/src/components/EventList.jsx
import React, { useState, useEffect } from "react";

function EventList() {
 const [events, setEvents] = useState([]);
 const [joinMessage, setJoinMessage] = useState("");

 useEffect(() => {
  fetch("/api/events")
   .then((res) => res.json())
   .then((data) => setEvents(data))
   .catch((err) => console.error(err));
 }, []);

 const joinEvent = async (eventId) => {
  // For demonstration, using a dummy userId (replace with auth user id)
  const userId = 1;
  try {
   const res = await fetch(`/api/events/${eventId}/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
   });
   if (res.ok) {
    setJoinMessage("Joined event successfully!");
   } else {
    const data = await res.json();
    setJoinMessage(data.error || "Failed to join event");
   }
  } catch (err) {
   console.error(err);
   setJoinMessage("Error joining event");
  }
 };

 return (
  <div>
   <h2 className="text-2xl font-bold mb-4">Volunteer Events</h2>
   {joinMessage && <p className="mb-4 text-green-500">{joinMessage}</p>}
   <ul>
    {events.map((event) => (
     <li key={event.id} className="mb-4 p-4 border rounded">
      <h3 className="text-xl font-semibold">{event.title}</h3>
      <p>{event.description}</p>
      <p>
       Date: {event.date} Time: {event.time}
      </p>
      <p>
       Location: {event.location} | Category: {event.category}
      </p>
      <button
       onClick={() => joinEvent(event.id)}
       className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
      >
       Join Event
      </button>
     </li>
    ))}
   </ul>
  </div>
 );
}

export default EventList;
