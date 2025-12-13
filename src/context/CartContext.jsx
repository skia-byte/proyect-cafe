import { createContext, useContext, useState } from "react";

// Creamos un contexto para compartir el carrito en toda la aplicación
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Estado que guarda los productos del carrito
  const [items, setItems] = useState([]);

  // Función para agregar un producto al carrito
  const addItem = (item) => {
    // Verificamos si el producto ya existe en el carrito
    const exists = items.find((i) => i.id === item.id);
    if (exists) {
      // Si existe, aumentamos la cantidad (aseguramos que nunca sea undefined)
      setItems(
        items.map((i) =>
          i.id === item.id ? { ...i, cantidad: (i.cantidad || 1) + 1 } : i
        )
      );
    } else {
      // Si no existe, lo agregamos con cantidad inicial = 1
      setItems([...items, { ...item, cantidad: 1 }]);
    }
  };

  // Función para eliminar un producto del carrito
  const removeItem = (id) => {
    setItems(items.filter((i) => i.id !== id));
  };

  // Función para vaciar el carrito
  const clearCart = () => setItems([]);

  // Proveemos el estado y funciones a toda la app
  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar el carrito fácilmente en otros componentes
export const useCart = () => useContext(CartContext);
