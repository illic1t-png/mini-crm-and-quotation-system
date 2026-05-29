import { auth, db} from "../firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";


export const createLead = async (fullName, phone, email, address) => {
  try {
    const docRef = await addDoc(collection(db, "leads"), {
      fullName,
      phone,
      email,
      address,
      ownerId: auth.currentUser.uid,
    });
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};
