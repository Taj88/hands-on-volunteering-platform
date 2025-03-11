// /frontend/src/App.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import RegistrationForm from "./components/RegistrationForm";
import EventList from "./components/EventList";
import HelpBoard from "./components/HelpBoard";
import TeamDashboard from "./components/TeamDashboard";
import ImpactTracker from "./components/ImpactTracker";

function App() {
 console.log("App component rendered");

 return (
  <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
   <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
    Welcome to the Volunteer App
   </h1>
   <nav
    className="mb-8 flex justify-center"
    style={{ display: "flex", gap: "20px" }}
   >
    <Link className="text-blue-500 hover:underline" to="/">
     Events
    </Link>
    <Link className="text-blue-500 hover:underline" to="/help">
     Help Requests
    </Link>
    <Link className="text-blue-500 hover:underline" to="/teams">
     Teams
    </Link>
    <Link className="text-blue-500 hover:underline" to="/impact">
     Impact Tracker
    </Link>
    <Link className="text-blue-500 hover:underline" to="/auth">
     Login / Register
    </Link>
   </nav>
   <div className="p-4 bg-white shadow rounded">
    <Routes>
     <Route path="/" element={<EventList />} />
     <Route path="/help" element={<HelpBoard />} />
     <Route path="/teams" element={<TeamDashboard />} />
     <Route path="/impact" element={<ImpactTracker />} />
     <Route path="/auth" element={<RegistrationForm />} />
    </Routes>
   </div>
  </div>
 );
}

export default App;
