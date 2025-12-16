import React, { useState } from "react";

const CoffeeQuiz = () => {
  const [recomendacion, setRecomendacion] = useState(null);

  const opciones = [
    {
      id: "sueno",
      preg: "💤 Con sueño",
      nombre: "Espresso Doble",
      color: "bg-amber-800",
    },
    {
      id: "dulce",
      preg: "🍯 Algo dulce",
      nombre: "Affogato",
      color: "bg-yellow-600",
    },
    {
      id: "calor",
      preg: "❄️ Con calor",
      nombre: "Cold Brew",
      color: "bg-blue-500",
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 mb-10 text-center max-w-2xl mx-auto">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        ✨ ¿No sabes qué elegir?
      </h3>
      <div className="flex flex-wrap justify-center gap-3">
        {opciones.map((o) => (
          <button
            key={o.id}
            onClick={() => setRecomendacion(o)}
            className={`${o.color} text-white px-4 py-2 rounded-full hover:opacity-80 transition-all font-medium text-sm`}
          >
            {o.preg}
          </button>
        ))}
      </div>

      {recomendacion && (
        <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200 animate-pulse">
          <p className="text-amber-900 font-semibold">
            Te recomendamos el:{" "}
            <span className="text-xl block">{recomendacion.nombre} ☕</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default CoffeeQuiz;
