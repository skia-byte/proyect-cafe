import React, { useEffect, useState } from "react";
import { getAllProducts } from "../FireBase/productsService";
import CoffeeMenuItem from "../components/CoffeeMenuItem";

const CoffeeMenu = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {/* Encabezado */}
      <header className="max-w-5xl mx-auto text-center py-8 md:py-12 mb-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-2 md:text-4xl lg:text-5xl">
          Nuestro Menú de Cafés ☕
        </h1>
        <p className="text-base text-gray-600 font-light md:text-lg lg:text-xl">
          El arte del café en cada sorbo.
        </p>
        <div className="h-1 w-16 bg-amber-500 mx-auto mt-4 md:w-20"></div>
      </header>

      {/* Lista del Menú */}
      <section className="max-w-5xl mx-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-6 border-b-2 border-gray-200 pb-2 md:text-2xl lg:text-3xl">
          Especialidades
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-500">No hay cafés disponibles todavía.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <CoffeeMenuItem key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Pie de Página */}
      <footer className="max-w-5xl mx-auto text-center mt-12 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-500 md:text-sm lg:text-base">
          Pregunta por nuestras opciones de leche vegetal y jarabes adicionales.
        </p>
      </footer>
    </div>
  );
};

export default CoffeeMenu;
