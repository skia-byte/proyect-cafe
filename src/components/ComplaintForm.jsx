import React, { useState } from 'react';

const ComplaintForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    dni: '',
    telefono: '',
    correo: '',
    tipo: '',
    descripcion: '',
    pedido: '',
    accion: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^\d{8}$/.test(formData.dni)) {
      alert("El DNI debe tener 8 números");
      return;
    }

    if (!/^\d{9}$/.test(formData.telefono)) {
      alert("El teléfono debe tener 9 números");
      return;
    }

    if (formData.nombre.length < 3) {
      alert("El nombre es muy corto");
      return;
    }

    if (!formData.correo.includes('@')) {
      alert("Correo no válido");
      return;
    }

    if (!formData.tipo) {
      alert("Selecciona un tipo");
      return;
    }

    alert("¡Reclamo enviado! ✅");
    
    setFormData({
      nombre: '', dni: '', telefono: '', correo: '',
      tipo: '', descripcion: '', pedido: '', accion: ''
    });
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Datos del consumidor */}
        <fieldset className="border-2 border-[#d7b89c] rounded-xl p-6">
          <legend className="text-2xl font-bold text-[#a7754f] px-4 font-serif border-b-2 border-[#44250a]">
            Datos del consumidor
          </legend>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="md:col-span-2">
              <label className="block text-[#1d120b] font-medium mb-3">Nombre completo:</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="w-full p-4 border border-[#cdb8a6] rounded-lg focus:border-[#8b5e3c] focus:ring-3 focus:ring-[#8b5e3c] focus:ring-opacity-15 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-[#1d120b] font-medium mb-3">DNI:</label>
              <input
                type="text"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                maxLength="8"
                className="w-full p-4 border border-[#cdb8a6] rounded-lg focus:border-[#8b5e3c] focus:ring-3 focus:ring-[#8b5e3c] focus:ring-opacity-15 transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-[#1d120b] font-medium mb-3">Teléfono:</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                maxLength="9"
                className="w-full p-4 border border-[#cdb8a6] rounded-lg focus:border-[#8b5e3c] focus:ring-3 focus:ring-[#8b5e3c] focus:ring-opacity-15 transition-all"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-[#1d120b] font-medium mb-3">Correo electrónico:</label>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className="w-full p-4 border border-[#cdb8a6] rounded-lg focus:border-[#8b5e3c] focus:ring-3 focus:ring-[#8b5e3c] focus:ring-opacity-15 transition-all"
                required
              />
            </div>
          </div>
        </fieldset>

        {/* Detalle de la queja o reclamo */}
        <fieldset className="border-2 border-[#d7b89c] rounded-xl p-6">
          <legend className="text-2xl font-bold text-[#a7754f] px-4 font-serif border-b-2 border-[#44250a]">
            Detalle de la queja o reclamo
          </legend>

          <div className="space-y-6 mt-6">
            <div>
              <label className="block text-[#1d120b] font-medium mb-3">Tipo:</label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="w-full p-4 border border-[#cdb8a6] rounded-lg focus:border-[#8b5e3c] focus:ring-3 focus:ring-[#8b5e3c] focus:ring-opacity-15 transition-all"
                required
              >
                <option value="">Seleccione</option>
                <option value="queja">Queja</option>
                <option value="reclamo">Reclamo</option>
              </select>
            </div>

            <div>
              <label className="block text-[#1d120b] font-medium mb-3">Descripción:</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows="4"
                className="w-full p-4 border border-[#cdb8a6] rounded-lg focus:border-[#8b5e3c] focus:ring-3 focus:ring-[#8b5e3c] focus:ring-opacity-15 transition-all resize-vertical min-h-[100px]"
                required
              />
            </div>

            <div>
              <label className="block text-[#1d120b] font-medium mb-3">Pedido relacionado:</label>
              <input
                type="text"
                name="pedido"
                value={formData.pedido}
                onChange={handleChange}
                className="w-full p-4 border border-[#cdb8a6] rounded-lg focus:border-[#8b5e3c] focus:ring-3 focus:ring-[#8b5e3c] focus:ring-opacity-15 transition-all"
              />
            </div>
          </div>
        </fieldset>

        {/* Acción solicitada */}
        <fieldset className="border-2 border-[#d7b89c] rounded-xl p-6">
          <legend className="text-2xl font-bold text-[#a7754f] px-4 font-serif border-b-2 border-[#44250a]">
            Acción solicitada
          </legend>

          <div className="mt-6">
            <label className="block text-[#1d120b] font-medium mb-3">Indique lo que espera:</label>
            <textarea
              name="accion"
              value={formData.accion}
              onChange={handleChange}
              rows="3"
              className="w-full p-4 border border-[#cdb8a6] rounded-lg focus:border-[#8b5e3c] focus:ring-3 focus:ring-[#8b5e3c] focus:ring-opacity-15 transition-all resize-vertical"
              required
            />
          </div>
        </fieldset>

        {/* Botón de enviar */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#8b5e3c] hover:bg-[#6d482e] text-white font-bold py-4 px-12 rounded-lg text-lg transition-all duration-300 hover:translate-y-[-2px] shadow-lg"
          >
            Enviar reclamo
          </button>
        </div>
      </form>
    </div>
  );
};

export default ComplaintForm;