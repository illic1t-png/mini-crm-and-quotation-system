import { useEffect } from "react";
import { auth, db } from "../firebase/config.js";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import LeadsTable from "./tables/LeadsTable.jsx";
import LeadsForm from "./forms/LeadsForm.jsx";



function App() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Firebase Auth:", auth);
    console.log("Firestore DB:", db);

    const testConnection = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "test"));
        console.log("Firestore connected successfully");
        console.log(querySnapshot.docs);
      } catch (error) {
        console.error("Firestore connection failed:", error);
      }
    };

    testConnection();
  }, []);

  return (
    <div>
      <h1>Firebase Connection Test</h1>
      <LeadsTable />
      <LeadsForm />
    </div>
  );
}

export default App;