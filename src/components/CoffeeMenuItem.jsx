import React from "react";
import { useCart } from "../context/CartContext"; // Usamos el contexto del carrito

const CoffeeMenuItem = ({ product }) => {
  const { addItem } = useCart();

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 md:p-8 lg:p-10">
      <div className="flex justify-between items-start mb-2">
        {/* Nombre del Café */}
        <h3 className="text-lg font-semibold text-gray-800 md:text-xl lg:text-2xl">
          {product.name}
        </h3>

        {/* Precio */}
        <p className="text-xl font-bold text-green-700 ml-4 md:text-2xl lg:text-3xl">
          ${product.price?.toFixed(2)}
        </p>
      </div>

      {/* Descripción */}
      <p className="text-sm text-gray-600 mb-3 md:text-base lg:text-lg">
        {product.description}
      </p>

      {/* Origen */}
      {product.origin && (
        <p className="text-xs font-medium text-amber-700 bg-amber-100 py-1 px-2 rounded-full inline-block md:text-sm lg:text-base">
          Origen: {product.origin}
        </p>
      )}

      {/* Botón para agregar al carrito */}
      <button
        onClick={() =>
          addItem({
            id: product.id,
            name: product.name,
            price: product.price,
          })
        }
        className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 hover:cursor-pointer transition text-sm md:text-base lg:text-lg"
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default CoffeeMenuItem;
