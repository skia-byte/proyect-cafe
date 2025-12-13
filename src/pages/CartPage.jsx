import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { items, removeItem, clearCart } = useCart();

  // Calculamos el total sumando price * quantity
  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded shadow">
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
                  {i.name} x {i.quantity}
                </span>
                <span>${(i.price * i.quantity).toFixed(2)}</span>
                <button
                  onClick={() => removeItem(i.id)}
                  className="text-red-600 text-sm hover:cursor-pointer"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>

          {/* Total y botones */}
          <p className="mt-4 font-semibold">Total: ${total.toFixed(2)}</p>

          {/* Botones */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={clearCart}
              className="bg-gray-300 px-4 py-2 rounded hover:cursor-pointer"
            >
              Vaciar carrito
            </button>

            <Link
              to="/checkout"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 hover:cursor-pointer"
            >
              Finalizar pedido
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
