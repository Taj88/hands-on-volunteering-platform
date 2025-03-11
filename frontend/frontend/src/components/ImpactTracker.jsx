// /frontend/src/components/ImpactTracker.jsx
import React, { useState, useEffect } from "react";

function ImpactTracker() {
 const [newLog, setNewLog] = useState({ hours: "", eventId: "" });
 const [leaderboard, setLeaderboard] = useState([]);
 const [message, setMessage] = useState("");

 const fetchLeaderboard = async () => {
  try {
   const res = await fetch("/api/impact/leaderboard");
   const data = await res.json();
   setLeaderboard(data);
  } catch (err) {
   // corrected error handling
   console.error(err);
  }
 };

 useEffect(() => {
  fetchLeaderboard();
 }, []);

 const logHours = async (e) => {
  e.preventDefault();
  // For demo, using a dummy userId (replace with auth user id)
  try {
   const res = await fetch("/api/impact/log", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...newLog, userId: 1 }),
   });
   if (res.ok) {
    setMessage("Hours logged successfully!");
    setNewLog({ hours: "", eventId: "" });
    fetchLeaderboard();
   } else {
    const data = await res.json();
    setMessage(data.error || "Failed to log hours");
   }
  } catch (err) {
   console.error(err);
   setMessage("Error logging hours");
  }
 };

 return (
  <div>
   <h2 className="text-2xl font-bold mb-4">Impact Tracker</h2>
   {message && <p className="mb-4 text-green-500">{message}</p>}
   <form onSubmit={logHours} className="mb-4">
    <input
     type="number"
     className="w-full p-2 mb-2 border rounded"
     name="hours"
     placeholder="Hours Volunteered"
     value={newLog.hours}
     onChange={(e) => setNewLog({ ...newLog, hours: e.target.value })}
     required
    />
    <input
     type="text"
     className="w-full p-2 mb-2 border rounded"
     name="eventId"
     placeholder="Event ID (optional)"
     value={newLog.eventId}
     onChange={(e) => setNewLog({ ...newLog, eventId: e.target.value })}
    />
    <button className="bg-blue-500 text-white px-3 py-1 rounded" type="submit">
     Log Hours
    </button>
   </form>
   <h3 className="text-xl font-bold mb-2">Leaderboard</h3>
   <ul>
    {leaderboard.map((user) => (
     <li key={user.id} className="mb-2 p-2 border rounded">
      <p>
       {user.email} - {user.points} points
      </p>
     </li>
    ))}
   </ul>
  </div>
 );
}

export default ImpactTracker;
