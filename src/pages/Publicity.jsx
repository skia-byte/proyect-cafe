import React from "react";
import { Link } from "react-router-dom";
import useDarkMode from "../Hooks/userDarkMode";
import cafearoma from "../img/cafe-aroma.jpg";
import menu from "./Menu.jsx";
function Publicity() {
  return (
    <>
      <div className="container">
        <section className="bg-gradient-to-r from-amber-800 via-amber-600 to-amber-400 mb-6 rounded-b-lg shadow-lg">
          <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg text-center mb-6 ">
              Publicidad
            </h1>
          </div>
        </section>
        <p className="text-lg mb-4 dark:text-cafe-negro p-10">
          ¡Bienvenido a nuestra sección de publicidad! Aquí puedes encontrar
          información sobre nuestros productos y promociones especiales.
        </p>

        <img
          src={cafearoma}
          alt="Café Aroma"
          className="h-200 mt-4 rounded-lg shadow-md ml-130 mr-130 mb-5"
        />
        <Link
          to="/menu"
          className="ml-130 bg-cafe-oscuro text-white px-4 py-2 rounded hover:bg-cafe-negro transition-colors font-bold bg-amber-800 pr-100 mb-5 pt-2"
        >
          Haz tus pedidos aquí
        </Link>
        <div className="bg-white p-6 rounded-lg shadow-md dark:bg-cafe-claro dark:text-cafe-negro ml-130">
          <h2 className="text-xl font-semibold mb-4 dark:text-cafe-negro">
            Nuestra Propuesta
          </h2>
          <p className="mb-4 dark:text-cafe-negro">
            Ofrecemos productos de alta calidad y servicios excepcionales para
            satisfacer tus necesidades.
          </p>
          <ul className="list-disc pl-5 mb-4 dark:text-cafe-negro">
            <li>Productos frescos y naturales</li>
            <li>Servicio personalizado</li>
            <li>Ofertas exclusivas para nuestros clientes</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Publicity;
