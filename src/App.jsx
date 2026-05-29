import { useState } from "react";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/CRMLogin.jsx";
import TestComponent from "./components/testComponent.jsx";
import "./App.css";
import { AuthProvider } from "./context/authContext.jsx";
import { useAuth } from "./context/authContext.jsx";



function App() {
    const { currentUser, isLoggedIn } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/testComponent"
        element={ isLoggedIn ? <TestComponent /> : <Navigate to="/" />}
      />

    </Routes>
  );
}

export default App;
