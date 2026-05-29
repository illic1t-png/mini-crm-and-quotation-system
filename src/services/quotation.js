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

const toNumber = (value) => Number(value || 0);

const itemTotal = (item = {}) => {
  const quantity = toNumber(item.quantity) || 1;
  const unitPrice = toNumber(item.unitPrice ?? item.price);
  return quantity * unitPrice;
};

const subTotal = (items = []) =>
  items.reduce((total, item) => total + itemTotal(item), 0);

const discountAmount = (items = [], inputDiscount = 0) => {
  const rate = toNumber(inputDiscount) / 100;
  return subTotal(items) * rate;
};

const normalizeTaxRate = (taxRate = 0) => {
  const rate = toNumber(taxRate);
  return rate > 1 ? rate / 100 : rate;
};

const grandTotal = (items = [], taxRate = 0.12, inputDiscount = 0) => {
  const subtotal = subTotal(items);
  const discountedTotal = subtotal - discountAmount(items, inputDiscount);
  return discountedTotal * (1 + normalizeTaxRate(taxRate));
};

const createQuotation = async (quotation = {}) => {
  const ownerId = getCurrentUid();
  if (!ownerId) {
    throw new Error("A signed-in user is required to create quotations.");
  }

  const docRef = await addDoc(collection(db, "quotations"), {
    ...quotation,
    ownerId,
    deletedAt: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
};

const getQuotations = async () => {
  const ownerId = getCurrentUid();
  if (!ownerId) {
    return [];
  }

  const q = query(
    collection(db, "quotations"),
    where("deletedAt", "==", null),
    where("ownerId", "==", ownerId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnapshot) => ({
    id: docSnapshot.id,
    ...docSnapshot.data(),
  }));
};

const editQuotation = async (id, updates = {}) => {
  const quotationRef = doc(db, "quotations", id);

  await updateDoc(quotationRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });

  return id;
};

const deleteQuotation = async (id) => {
  const quotationRef = doc(db, "quotations", id);

  await updateDoc(quotationRef, {
    deletedAt: serverTimestamp(),
    status: "Deleted",
    updatedAt: serverTimestamp(),
  });

  return true;
};

export { createQuotation, deleteQuotation, discountAmount, editQuotation, getQuotations, grandTotal, itemTotal, subTotal };