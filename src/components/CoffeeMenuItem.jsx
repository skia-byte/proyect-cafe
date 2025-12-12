import { useCart } from "../context/CartContext";

const CoffeeMenuItem = ({ id, nombre, descripcion, precio, origen }) => {
  const { addItem } = useCart();

  return (
    <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100 flex flex-col md:p-6 lg:p-8">
      {/* Nombre y precio */}
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-800 md:text-xl lg:text-2xl">
          {nombre}
        </h3>
        <p className="text-xl font-bold text-green-700 ml-4 md:text-2xl lg:text-3xl">
          ${precio.toFixed(2)}
        </p>
      </div>

      {/* Descripción */}
      <p className="text-sm text-gray-600 mb-3 md:text-base lg:text-lg">
        {descripcion}
      </p>

      {/* Origen */}
      <p className="text-xs font-medium text-amber-700 bg-amber-100 py-1 px-2 rounded-full inline-block md:text-sm lg:text-base">
        Origen: {origen}
      </p>

      {/* Botón */}
      <button
        onClick={() => addItem({ id, nombre, precio })}
        className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition text-sm md:text-base lg:text-lg"
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default CoffeeMenuItem;
