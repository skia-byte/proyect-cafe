import React from "react";

const CoffeeMenuItem = ({ product }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="flex justify-between items-start mb-2">
        {/* Nombre del Café */}
        <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>

        {/* Precio */}
        <p className="text-2xl font-bold text-green-700 ml-4">
          ${product.price?.toFixed(2)}
        </p>
      </div>

      {/* Descripción */}
      <p className="text-gray-600 mb-3 text-sm">{product.description}</p>

      {/* Origen */}
      {product.origin && (
        <p className="text-xs font-medium text-amber-700 bg-amber-100 py-1 px-2 rounded-full inline-block">
          Origen: {product.origin}
        </p>
      )}
    </div>
  );
};

export default CoffeeMenuItem;
