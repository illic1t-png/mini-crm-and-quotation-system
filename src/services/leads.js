import { auth, db } from "../firebase/config";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";

const getCurrentUid = () => auth.currentUser?.uid || null;

export const createLead = async (fullName, phone, email, address, status = "New") => {
  const ownerId = getCurrentUid();
  if (!ownerId) {
    throw new Error("A signed-in user is required to create leads.");
  }

  try {
    const docRef = await addDoc(collection(db, "leads"), {
      fullName,
      phone,
      email,
      address,
      status,
      ownerId,
      deletedAt: null,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    console.log("AUTH:", auth.currentUser);
    console.log("DB:", db);
    console.log("SUCCESS:", docRef.id);
    console.log("Total Leads in DB:", (await getDocs(collection(db, "leads"))).size);

    return docRef.id;
  } catch (e) {
    console.error("Error adding document:", e);
    console.error("FIRESTORE ERROR:", e);
    throw e;
  }
};

export const getLeads = async () => {
  const ownerId = getCurrentUid();
  if (!ownerId) {
    return [];
  }

  const q = query(
    collection(db, "leads"),
    where("deletedAt", "==", null),
    where("ownerId", "==", ownerId),
    orderBy("createdAt", "desc")
  );

  const leadsSnapshot = await getDocs(q);
  return leadsSnapshot.docs.map((snapshot) => ({
    id: snapshot.id,
    ...snapshot.data(),
  }));
};

export const getRecentLeads = async () => {
  const ownerId = getCurrentUid();
  if (!ownerId) {
    return [];
  }

  const q = query(
    collection(db, "leads"),
    where("deletedAt", "==", null),
    where("ownerId", "==", ownerId),
    orderBy("createdAt", "desc")
  );

  const leadsSnapshot = await getDocs(q);
  return leadsSnapshot.docs.map((snapshot) => ({
    id: snapshot.id,
    ...snapshot.data(),
  }));
};

export const editLeads = async (id, updates) => {
  const leadRef = doc(db, "leads", id);

  await updateDoc(leadRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });

  return id;
};

export const deleteLeads = async (id) => {
  const leadRef = doc(db, "leads", id);

  await updateDoc(leadRef, {
    deletedAt: serverTimestamp(),
    status: "Deleted",
    updatedAt: serverTimestamp(),
  });

  return true;
};