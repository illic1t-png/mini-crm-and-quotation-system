import { useEffect } from "react";
import { auth, db } from "../firebase/config.js";
import { collection, getDocs } from "firebase/firestore";
import CRMDashboard from "./CRMDashboard.jsx";

export default function CRMApp() {
  useEffect(() => {
    console.log("Firebase Auth:", auth);
    console.log("Firestore DB:", db);
  }, []);

  return (
    <div>
      <CRMDashboard />
    </div>
  );
}
