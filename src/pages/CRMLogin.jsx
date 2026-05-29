import React, { useState } from "react";
import { doSignInWithEmailAndPassword } from "../services/auth";
import { useNavigate } from "react-router-dom";

export default function CRMLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!isSigningIn) {
      setIsSigningIn(true);
      setError("");

      try {
        await doSignInWithEmailAndPassword(email, password);
        navigate("/dashboard");
      } catch (error) {
        setError(error.message);
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md rounded-[32px] border border-gray-200 bg-white p-8 shadow-2xl">
        <div className="mb-8">
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-gray-900">Welcome back</h1>
          <p className="mt-2 text-sm text-gray-500">
            Sign in to access your dashboard, manage leads, and create new quotations.
          </p>
        </div>

        {error && (
          <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={onSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/10"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/10"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSigningIn}
            className="flex w-full items-center justify-center rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent/90 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {isSigningIn ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-500">
          Forgot password? <a href="#" className="font-semibold text-accent hover:underline">Reset here</a>
        </p>
      </div>
    </div>
  );
}

