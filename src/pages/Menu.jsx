<<<<<<< HEAD
import React from "react";

// Datos de los cafés (Simulando la carga del archivo mis_cafes.json)
const coffeeItems = [
  {
    id: "c001",
    nombre: "Espresso Doble",
    descripcion:
      "Concentrado intenso y aromático, la base de todos nuestros cafés.",
    precio: 3.0,
    origen: "Etiopía Yirgacheffe",
  },
  {
    id: "c002",
    nombre: "Latte Vainilla",
    descripcion:
      "Shot de espresso, leche al vapor y un toque de sirope de vainilla.",
    precio: 4.5,
    origen: "Colombia Supremo",
  },
  {
    id: "c003",
    nombre: "Cappuccino Clásico",
    descripcion: "Espresso con leche espumada y una capa de microespuma.",
    precio: 4.25,
    origen: "Brasil Cerrado",
  },
  {
    id: "c004",
    nombre: "Cold Brew",
    descripcion:
      "Café infusionado en frío durante 18 horas para un sabor suave.",
    precio: 5.0,
    origen: "Guatemala Antigua",
  },
  {
    id: "c005",
    nombre: "Mocaccino",
    descripcion: "Espresso, leche, sirope de chocolate y crema batida.",
    precio: 5.5,
    origen: "Colombia Supremo",
  },
];

/**
 * Componente que representa un solo elemento del menú de café.
 * Utiliza clases de Tailwind para el estilo.
 */
const CoffeeMenuItem = ({ nombre, descripcion, precio, origen }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
      <div className="flex justify-between items-start mb-2">
        {/* Nombre del Café */}
        <h3 className="text-xl font-semibold text-gray-800">{nombre}</h3>
        {/* Precio */}
        <p className="text-2xl font-bold text-green-700 ml-4">
          ${precio.toFixed(2)}
        </p>
      </div>

      {/* Descripción */}
      <p className="text-gray-600 mb-3 text-sm">{descripcion}</p>

      {/* Origen */}
      <p className="text-xs font-medium text-amber-700 bg-amber-100 py-1 px-2 rounded-full inline-block">
        Origen: {origen}
      </p>
    </div>
  );
};

/**
 * Componente principal de la página de menú de café.
 */
const CoffeeMenuPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
      {/* Encabezado */}
      <header className="max-w-4xl mx-auto text-center py-10 mb-8 bg-white shadow-md rounded-lg">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-2">
          Nuestro Menú de Cafés ☕
        </h1>
        <p className="text-xl text-gray-600 font-light">
          El arte del café en cada sorbo.
        </p>
        <div className="h-1 w-20 bg-amber-500 mx-auto mt-4"></div>
      </header>

      {/* Lista del Menú */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-200 pb-2">
          Especialidades
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mapea los datos del array para renderizar los elementos */}
          {coffeeItems.map((item) => (
            <CoffeeMenuItem
              key={item.id}
              nombre={item.nombre}
              descripcion={item.descripcion}
              precio={item.precio}
              origen={item.origen}
            />
          ))}
        </div>
      </section>

      {/* Pie de Página */}
      <footer className="max-w-4xl mx-auto text-center mt-12 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Pregunta por nuestras opciones de leche vegetal y jarabes adicionales.
        </p>
      </footer>
    </div>
  );
};

export default CoffeeMenuPage;
=======
function Menu() {
  return <h1>Menu</h1>;
}

export default Menu;
>>>>>>> ffc75093b8d00e9d9a6392ef8d0365755062739c
