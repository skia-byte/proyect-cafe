import React from "react";
import { useCart } from "../context/CartContext";
import { saveOrder } from "../firebase/orders";

const Checkout = () => {
  const { items, clearCart } = useCart();

  // Función para enviar pedido a Firebase
  const handleOrder = async () => {
    if (items.length === 0) return alert("Carrito vacío");

    // Guardamos la orden en Firestore
    await saveOrder({
      cliente: "Cliente Demo", // luego puedes pedir nombre/dirección
      items,
      total: items.reduce((sum, i) => sum + i.precio * i.cantidad, 0),
    });

    // Limpiamos carrito y avisamos
    clearCart();
    alert("Pedido enviado con éxito ✅");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Finalizar Pedido</h2>
      <button
        onClick={handleOrder}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Confirmar pedido
      </button>
    </div>
  );
};

export default Checkout;
