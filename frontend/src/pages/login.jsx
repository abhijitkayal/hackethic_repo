import React, { useState } from "react";
import { useSignIn, useUser, UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom"; 

const CustomLogin = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  if (!isLoaded) {
    return <div>Loading...</div>; 
  }

  if (isSignedIn) {
    return (
      <div className="logged-in">
        <h2>Welcome back!</h2>
        <UserButton afterSignOutUrl="/" /> 
      </div>
    );
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus("Processing...");

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        setStatus("Login successful!");
        navigate("/"); 
      } else {
        setStatus("Additional steps required (MFA, etc.)");
      }
    } catch (err) {
      setStatus(err.errors?.[0]?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white-900">
    <div className="login-container flex flex-col gap-3 max-w-sm w-full p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2>Custom Login</h2>
      <form onSubmit={handleLogin} className="gap-5 ">
        <input
          type="email"
          placeholder="Email or Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 p-2"
          required
        />

        <input
          type="password"
          className="mb-2 p-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="m-3 hover:border-amber-50 rounded-2xl">Sign In</button>
      </form>
      

      <p>{status}</p>
    </div>
    </div>
  );
};

export default CustomLogin;
