// /frontend/src/components/TeamDashboard.jsx
import React, { useState, useEffect } from "react";

function TeamDashboard() {
 const [teams, setTeams] = useState([]);
 const [newTeam, setNewTeam] = useState({
  name: "",
  isPrivate: false,
 });
 const [message, setMessage] = useState("");

 useEffect(() => {
  fetch("/api/teams")
   .then((res) => res.json())
   .then((data) => setTeams(data))
   .catch((err) => console.error(err));
 }, []);

 const createTeam = async (e) => {
  e.preventDefault();
  // For demo, using a dummy creatorId (replace with auth user id)
  try {
   const res = await fetch("/api/teams", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...newTeam, creatorId: 1 }),
   });
   if (res.ok) {
    const data = await res.json();
    setTeams([data, ...teams]);
    setMessage("Team created successfully!");
    setNewTeam({ name: "", isPrivate: false });
   } else {
    const data = await res.json();
    setMessage(data.error || "Failed to create team");
   }
  } catch {
   setMessage("Error creating team");
  }
 };

 const joinTeam = async (teamId) => {
  // For demo, using a dummy userId (replace with auth user id)
  try {
   const res = await fetch(`/api/teams/${teamId}/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: 1 }),
   });
   if (res.ok) {
    setMessage("Joined team successfully!");
   } else {
    const data = await res.json();
    setMessage(data.error || "Failed to join team");
   }
  } catch {
   setMessage("Error joining team");
  }
 };

 return (
  <div>
   <h2 className="text-2xl font-bold mb-4">Team Dashboard</h2>
   {message && <p className="mb-4 text-green-500">{message}</p>}
   <form onSubmit={createTeam} className="mb-4">
    <input
     type="text"
     className="w-full p-2 mb-2 border rounded"
     name="name"
     placeholder="Team Name"
     value={newTeam.name}
     onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
     required
    />
    <label className="block mb-2">
     <input
      type="checkbox"
      checked={newTeam.isPrivate}
      onChange={(e) => setNewTeam({ ...newTeam, isPrivate: e.target.checked })}
     />
     <span className="ml-2">Private Team</span>
    </label>
    <button className="bg-blue-500 text-white px-3 py-1 rounded" type="submit">
     Create Team
    </button>
   </form>
   <ul>
    {teams.map((team) => (
     <li key={team.id} className="mb-4 p-4 border rounded">
      <h3 className="text-xl font-semibold">{team.name}</h3>
      <p>Privacy: {team.is_private ? "Private" : "Public"}</p>
      <button
       onClick={() => joinTeam(team.id)}
       className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
      >
       Join Team
      </button>
     </li>
    ))}
   </ul>
  </div>
 );
}

export default TeamDashboard;
