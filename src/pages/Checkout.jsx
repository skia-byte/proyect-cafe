import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { saveOrder } from "../firebase/orders";

const Checkout = () => {
  const { items, clearCart } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [error, setError] = useState(""); // Estado para errores
  const [success, setSuccess] = useState(""); // Estado para confirmación
  const [loading, setLoading] = useState(false); // Estado para mostrar cargando

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleOrder = async () => {
    setError("");
    setSuccess("");

    if (items.length === 0) {
      setError("Carrito vacío");
      return;
    }

    if (!customerName || !address || !phone) {
      setError("Por favor completa todos los campos");
      return;
    }

    try {
      setLoading(true);
      await saveOrder({
        customerName,
        address,
        phone,
        items,
        total,
      });

      clearCart();
      setSuccess("Pedido enviado con éxito ✅");
    } catch (err) {
      setError("Hubo un error al enviar el pedido. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Finalizar Pedido</h2>

      {/* Mensajes de error o éxito */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {success}
        </div>
      )}

      {/* Resumen del carrito */}
      <ul className="mb-4">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <p className="font-semibold mb-6">Total: ${total.toFixed(2)}</p>

      {/* Formulario */}
      <div className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Nombre completo"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Dirección"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      {/* Botón confirmar */}
      <button
        onClick={handleOrder}
        disabled={loading}
        className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 hover:cursor-pointer${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Enviando..." : "Confirmar pedido"}
      </button>
    </div>
  );
};

export default Checkout;
