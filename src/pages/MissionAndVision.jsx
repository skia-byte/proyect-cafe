import React from "react";
import cafeteria from "../img/cafeteria.jpg";

const MissionAndVision = () => {
  return (
    <div className="min-h-screen bg-amber-50 py-8 px-4">
      <div className="max-w-4xl mx-auto bg-amber-100 rounded-lg shadow-md overflow-hidden mb-8">
        <img
          src={cafeteria}
          alt="cafeteria"
          className="w-full h-64 object-cover"
        />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center">
              <span className="text-2xl mr-2">☕</span>
              Misión
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Ofrecer una experiencia única en cada taza de café, combinando
              calidad, sabor y un ambiente acogedor que invite a la
              conversación, la creatividad y el disfrute.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center">
              <span className="text-2xl mr-2">👁️</span>
              Visión
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Ser la cafetería referente en la ciudad por la excelencia de
              nuestros productos, el compromiso con la sostenibilidad y la
              capacidad de crear un espacio donde las personas se sientan como
              en casa.
            </p>
          </div>
        </div>

        <div className="bg-amber-200 rounded-lg p-6 text-center">
          <blockquote className="text-amber-900 italic mb-2">
            "El café es un tipo de magia que puedes tomar".
          </blockquote>
          <footer className="text-amber-800 font-medium">
            - Catherynne M. Valente
          </footer>
        </div>
      </div>
    </div>
  );
};

export default MissionAndVision;
