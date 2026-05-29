import { Navigate, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/CRMLogin.jsx";
import CRMApp from "./pages/CRMApp.jsx";
import "./App.css";
import { useAuth } from "./context/authContext.jsx";



function App() {
  const { isLoggedIn } = useAuth();
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />

      <Route
        path="/dashboard"
        element={ isLoggedIn ? <CRMApp /> : <Navigate to="/" />}
      />

    </Routes>
  );
}

export default App;
