import React from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />
      <div className="pt-20 text-center bg-gradient-to-r from-amber-800 via-amber-600 to-amber-400 p-6">
        <h1 className="text-5xl font-bold text-[#fbf6f2] ">
          Bienvenido a Café Aroma
        </h1>
        <p className="mt-4 text-[#fbf6f2]">Descubre el mejor café artesanal.</p>{" "}
        <br />
      </div>
      <hr className="my-8 border-[#9c7042] border-opacity-30" />

      {/* Portada */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gray-100 rounded-lg shadow-xl overflow-hidden md:flex md:items-center">
          <div className="md:w-1/2">
            <div
              className="h-64 bg-cover bg-center rounded-t-lg md:h-full md:rounded-l-lg md:rounded-t-none"
              style={{
                backgroundImage:
                  "url('https://cafelab.pe/wp-content/uploads/2024/05/OrigenTostadores_cafelab.pe_-1536x1024.jpg')",
              }}
              img
              alt="Café Aroma"
            >
              <img
                src="https://gourmet.expob2b.es/uploads/fotos_noticias/2015/11/w800px_11239-90379.jpg"
                alt="Café Aroma"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="p-10 md:w-1/2">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              La Experiencia del Café Perfecto
            </h2>
            <p className="text-gray-600 mb-6">
              Cada taza es una obra de arte. Utilizamos granos seleccionados a
              mano y un proceso de tostado que resalta los aromas únicos.
              ¡Visítanos y compruébalo!
            </p>

            <Link
              to="/menu"
              className="inline-block px-8 py-3 bg-[#9c7042] text-white font-bold rounded-full transition duration-300 hover:bg-[#7b5a34] shadow-md"
            >
              Explora Nuestro Menú ☕
            </Link>
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4 md:flex md:items-center md:space-x-12">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <p className="text-[#9c7042] text-lg font-semibold uppercase mb-2">
              Nuestra Esencia
            </p>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              El Arte de Crear un Momento Único
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              En Café Aroma, cada barista es un artesano. Nos dedicamos a honrar
              el proceso completo, desde la meticulosa selección de los granos
              hasta la preparación experta de tu bebida. Nuestro compromiso es
              con la perfección en cada detalle.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Más allá del café, hemos creado un refugio. Un lugar donde la
              calidez de la madera, el suave aroma tostado y la música tranquila
              se combinan para ofrecerte la pausa que te mereces en tu día.
            </p>
          </div>

          <div className="md:w-1/2">
            <img
              src="https://cafelab.pe/wp-content/uploads/2024/05/OrigenTostadores_cafelab.pe_-1536x1024.jpg"
              alt="Nuestra Historia"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
