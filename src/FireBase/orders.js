import { db } from "./firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

// Función que guarda un orden en la colección "orders"
export const saveOrder = async (order) => {
  const ref = collection(db, "orders");
  await addDoc(ref, {
    ...order,
    createdAt: serverTimestamp(), // fecha automática
    status: "pendiente", // estado inicial del pedido
  });
};
