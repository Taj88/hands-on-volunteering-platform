// /frontend/src/components/RegistrationForm.jsx
import React, { useState } from "react";

function RegistrationForm() {
 const [isLogin, setIsLogin] = useState(true);
 const [formData, setFormData] = useState({
  email: "",
  password: "",
  skills: "",
  causes: "",
 });
 const [message, setMessage] = useState("");

 const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
  try {
   const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
   });
   const data = await res.json();
   if (res.ok) {
    setMessage(
     isLogin ? "Logged in successfully!" : "Registered successfully!"
    );
    // Save token and update auth state as needed.
   } else {
    setMessage(data.error);
   }
  } catch {
   setMessage("An error occurred");
  }
 };

 return (
  <div className="max-w-md mx-auto">
   <h2 className="text-xl font-bold mb-4">{isLogin ? "Login" : "Register"}</h2>
   <form onSubmit={handleSubmit}>
    <input
     className="w-full p-2 mb-2 border rounded"
     type="email"
     name="email"
     placeholder="Email"
     value={formData.email}
     onChange={handleChange}
     required
    />
    <input
     className="w-full p-2 mb-2 border rounded"
     type="password"
     name="password"
     placeholder="Password"
     value={formData.password}
     onChange={handleChange}
     required
    />
    {!isLogin && (
     <>
      <input
       className="w-full p-2 mb-2 border rounded"
       type="text"
       name="skills"
       placeholder="Skills"
       value={formData.skills}
       onChange={handleChange}
      />
      <input
       className="w-full p-2 mb-2 border rounded"
       type="text"
       name="causes"
       placeholder="Causes you support"
       value={formData.causes}
       onChange={handleChange}
      />
     </>
    )}
    <button className="w-full bg-blue-500 text-white p-2 rounded" type="submit">
     {isLogin ? "Login" : "Register"}
    </button>
   </form>
   <p className="mt-2 text-center">
    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
    <button className="text-blue-500" onClick={() => setIsLogin(!isLogin)}>
     {isLogin ? "Register" : "Login"}
    </button>
   </p>
   {message && <p className="mt-2 text-center text-red-500">{message}</p>}
  </div>
 );
}

export default RegistrationForm;
