import { useState, useEffect, useMemo } from 'react';
import { db } from '../FireBase/firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export const useMenu = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const colRef = collection(db, "products");

    // cargando
    setLoading(true);

    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log("🔄 Actualización en tiempo real del menú:", data.length);

        setProducts(data);
        setError(null);
        setLoading(false);
      },
      (err) => {
        console.error("❌ Error en tiempo real con productos:", err);
        setError("No se pudo cargar el menú en tiempo real.");
        setLoading(false);
      }
    );

    return () => unsubscribe();

  }, []);

  // Transformar datos del menú
  const menuItems = useMemo(() =>
    products.map(product => ({
      id: product.id,
      nombre: product.name,
      descripcion: product.description,
      precio: product.price,
      origen: product.origin,
    })),
  [products]);

  return {
    menuItems,
    isLoading: loading,
    hasError: error,
    totalProducts: products.length,
  };
};
