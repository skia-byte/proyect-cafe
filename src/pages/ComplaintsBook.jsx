<<<<<<< HEAD
function ComplaintsBook() {
  return <h1>Libro de Reclamaciones</h1>;
}

export default ComplaintsBook;
=======
import React from 'react';
import ComplaintForm from '../components/ComplaintForm';

const ComplaintsBook = () => {
  return (
    <div className="min-h-screen bg-[#dcc5a1]">
      {/* Header con gradiente café */}
      <div className="bg-gradient-to-r from-[#4b2e1e] to-[#8b5e3c] py-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4 font-serif">Libro de Reclamaciones</h1>
          <p className="text-xl text-[#dcc5a1] max-w-2xl mx-auto">
            Queremos mejorar tu experiencia en <strong className="text-white">Café Aroma</strong>. 
            Por favor, completa el siguiente formulario.
          </p>
        </div>
      </div>

      {/* Formulario */}
      <div className="container mx-auto px-4 py-12">
        <ComplaintForm />

        {/* Información adicional */}
        <div className="max-w-3xl mx-auto mt-8 bg-[#f6f1e7] rounded-xl p-6 border border-[#d7b89c]">
          <h3 className="text-xl font-bold text-[#4b2e1e] mb-3 font-serif">Información importante</h3>
          <p className="text-[#5a4632]">
            Nos comprometemos a responder tu reclamo en un plazo máximo de 15 días hábiles. 
            Tu satisfacción es nuestra prioridad en Café Aroma.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComplaintsBook;
>>>>>>> 6ae55d0 (feat: agregar estilos al libro de reclamaciones)
