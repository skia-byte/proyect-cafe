import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";

const productsCollection = collection(db, "products");

export const getAllProducts = async () => {
  const snapshot = await getDocs(productsCollection);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const addProduct = async (product) => {
  await addDoc(productsCollection, product);
};

export const deleteProduct = async (id) => {
  await deleteDoc(doc(db, "products", productId));
};
