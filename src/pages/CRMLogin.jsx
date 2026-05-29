import React from "react";
import { doSignInWithEmailAndPassword, doPasswordReset } from "../services/auth";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const crmLogin = () => {
  const {currentUser, isLoggedIn} = useAuth();

  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if(!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
        console.log("LOGIN SUCCESS");

        navigate("/testComponent");
      } catch (error) {
        setError(error.message);
      }
    }
  }

  return (
    <div>
      <div>
        <div className="flex items-center justify-center min-h-screen bg-amber-100">
          <div className="p-[4vh] w-120 rounded-lg bg-white shadow-xl">
            <div className="pb-2px items-center justify-center">
              <h1 className="text-2xl font-semibold text-center mb-6 text-black">
                MiniCRM
              </h1>
            </div>
            <div>
              <p className="text-xs text-center font-light pb-2 text-black">
                LOGIN CREDENTIALS PLEASE!
              </p>
              <form className="space-y-4" onSubmit={onSubmit}>
                <div>
                  <input
                    type="text"
                    placeholder="Username or email"
                    className="w-full p-3 text-black text-sm border rounded-lg"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 text-black text-sm border rounded-lg"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button 
                type="submit"
                className="mt-4 p-3 w-full bg-black text-white rounded-lg">Login</button>
              </form>
              <p className="mt-1 pl-1 text-xs text-left font-light pb-2 text-black">
                Forgot Password? <a href="#" className="text-blue-500">Click here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default crmLogin
