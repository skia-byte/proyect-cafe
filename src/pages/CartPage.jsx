import React from "react";
import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { items, removeItem, clearCart } = useCart();

  // Calculamos el total sumando precio * cantidad
  const total = items.reduce((sum, i) => sum + i.precio * i.cantidad, 0);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Tu Carrito 🛒</h2>

      {/* Si el carrito está vacío */}
      {items.length === 0 ? (
        <p>No tienes productos en el carrito.</p>
      ) : (
        <>
          {/* Lista de productos */}
          <ul className="space-y-3">
            {items.map((i) => (
              <li key={i.id} className="flex justify-between items-center">
                <span>
                  {i.nombre} x {i.cantidad}
                </span>
                <span>${(i.precio * i.cantidad).toFixed(2)}</span>
                <button
                  onClick={() => removeItem(i.id)}
                  className="text-red-600 text-sm"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>

          {/* Total y botones */}
          <p className="mt-4 font-semibold">Total: ${total.toFixed(2)}</p>
          <button
            onClick={clearCart}
            className="mt-4 bg-gray-300 px-4 py-2 rounded"
          >
            Vaciar carrito
          </button>
        </>
      )}
    </div>
  );
};

export default CartPage;
