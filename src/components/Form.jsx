import React from "react";
import { useState } from "react";

function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    const newErrors = {};
    !formData.name.trim() && (newErrors.name = "El nombre es obligatorio.");
    !formData.email.trim()
      ? (newErrors.email = "El correo es obligatorio.")
      : !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email.trim()) &&
        (newErrors.email = "Correo inválido.");
    !formData.message.trim() &&
      (newErrors.message = "El mensaje es obligatorio.");
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    Object.keys(validationErrors).length
      ? (setErrors(validationErrors), setSuccess(false))
      : (setErrors({}),
        setSuccess(true),
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 md:p-6 lg:p-8 rounded-lg shadow-md space-y-6 w-full"
    >
      <div>
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-amber-900">
          Tu mensaje nos importa
        </h2>
      </div>

      <div>
        <label
          htmlFor="name"
          className="block text-sm md:text-base lg:text-lg text-amber-900"
        >
          Nombre completo
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ingresa tu nombre"
          className={`w-full p-2 md:p-3 lg:p-4 border rounded focus:outline-none focus:ring-2 focus:ring-amber-800 ${
            errors.name ? "border-red-600 bg-red-100" : "border-gray-300"
          }`}
        />
        {errors.name && (
          <p className="text-red-700 text-sm md:text-base lg:text-lg mt-1">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm md:text-base lg:text-lg text-amber-900"
        >
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Tu correo para responderte"
          className={`w-full p-2 md:p-3 lg:p-4 border rounded focus:outline-none focus:ring-2 focus:ring-amber-800 ${
            errors.email ? "border-red-600 bg-red-100" : "border-gray-300"
          }`}
        />
        {errors.email && (
          <p className="text-red-700 text-sm md:text-base lg:text-lg mt-1">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-sm md:text-base lg:text-lg text-amber-900"
        >
          Asunto (opcional)
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="¿Sobre qué quieres conversar?"
          className="w-full p-2 md:p-3 lg:p-4 border rounded focus:outline-none focus:ring-2 focus:ring-amber-800"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm md:text-base lg:text-lg text-amber-900"
        >
          Mensaje
        </label>
        <input
          type="text"
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Escríbenos lo que quieras compartir"
          className={`w-full p-2 md:p-3 lg:p-4 border rounded focus:outline-none focus:ring-2 focus:ring-amber-800 ${
            errors.message ? "border-red-600 bg-red-100" : "border-gray-300"
          }`}
        />
        {errors.message && (
          <p className="text-red-700 text-sm md:text-base lg:text-lg mt-1">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-amber-700 text-white px-4 py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-lg hover:bg-amber-900 hover:-translate-y-1 hover:scale-110 transition delay-150 duration-300 ease-in-out cursor-pointer text-sm md:text-base lg:text-lg"
      >
        Enviar
      </button>

      {success && (
        <div className="mt-4 text-green-700 p-3 text-sm md:text-base lg:text-lg">
          <p className="">¡Mensaje enviado con éxito!</p>
        </div>
      )}
    </form>
  );
}

export default Form;
