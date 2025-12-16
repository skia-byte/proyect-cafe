import React, { useEffect, useState } from "react";
import { getAllProducts } from "../FireBase/productsService";
import CoffeeMenuItem from "../components/CoffeeMenuItem";
import CoffeeQuiz from "./Quizz";
const Menu = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      setProducts(data);
    };

    fetchProducts();
  }, []);

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
      <CoffeeQuiz />
      {/* Lista del Menú */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-gray-200 pb-2">
          Especialidades
        </h2>

        {products.length === 0 ? (
          <p className="text-gray-500">No hay cafés disponibles todavía.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {products.map((product) => (
              <CoffeeMenuItem key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Menu;
