// /frontend/src/components/HelpBoard.jsx
import React, { useState, useEffect } from "react";

function HelpBoard() {
 const [helpRequests, setHelpRequests] = useState([]);
 const [newRequest, setNewRequest] = useState({
  message: "",
  urgency: "Low",
 });
 const [message, setMessage] = useState("");

 useEffect(() => {
  fetch("/api/help")
   .then((res) => res.json())
   .then((data) => setHelpRequests(data))
   .catch((err) => console.error(err));
 }, []);

 const postRequest = async (e) => {
  e.preventDefault();
  // For demo, using a dummy userId (replace with auth user id)
  const userId = 1;
  try {
   const res = await fetch("/api/help", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...newRequest, userId }),
   });
   if (res.ok) {
    const data = await res.json();
    setHelpRequests([data, ...helpRequests]);
    setMessage("Help request posted successfully!");
    setNewRequest({ message: "", urgency: "Low" });
   } else {
    const data = await res.json();
    setMessage(data.error || "Failed to post request");
   }
  } catch (err) {
   console.error(err);
   setMessage("Error posting help request");
  }
 };

 return (
  <div>
   <h2 className="text-2xl font-bold mb-4">Community Help Requests</h2>
   {message && <p className="mb-4 text-green-500">{message}</p>}
   <form onSubmit={postRequest} className="mb-4">
    <textarea
     className="w-full p-2 mb-2 border rounded"
     name="message"
     placeholder="Describe your help request"
     value={newRequest.message}
     onChange={(e) => setNewRequest({ ...newRequest, message: e.target.value })}
     required
    />
    <select
     className="w-full p-2 mb-2 border rounded"
     name="urgency"
     value={newRequest.urgency}
     onChange={(e) => setNewRequest({ ...newRequest, urgency: e.target.value })}
    >
     <option value="Low">Low</option>
     <option value="Medium">Medium</option>
     <option value="Urgent">Urgent</option>
    </select>
    <button className="bg-blue-500 text-white px-3 py-1 rounded" type="submit">
     Post Request
    </button>
   </form>
   <ul>
    {helpRequests.map((req) => (
     <li key={req.id} className="mb-4 p-4 border rounded">
      <p>{req.message}</p>
      <p>Urgency: {req.urgency}</p>
      <p>Posted on: {new Date(req.created_at).toLocaleString()}</p>
     </li>
    ))}
   </ul>
  </div>
 );
}

export default HelpBoard;
