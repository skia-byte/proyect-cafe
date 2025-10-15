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
    <form onSubmit={handleSubmit} className="">
      <div className="">
        <h2 className="">Tu mensaje nos importa</h2>
      </div>

      <div>
        <label htmlFor="name" className="">
          Nombre completo
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Ingresa tu nombre"
          className={`${
            errors.name ? "border-red-600 bg-red-100" : "border-gray-300"
          }`}
        />
        {errors.name && <p className="">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="">
          Correo electrónico
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Tu correo para responderte"
          className={`${
            errors.email ? "border-red-600 bg-red-100" : "border-gray-300"
          }`}
        />
        {errors.email && <p className="">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="subject" className="">
          Asunto (opcional)
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          placeholder="¿Sobre qué quieres conversar?"
          className=""
        />
      </div>

      <div>
        <label htmlFor="message" className="">
          Mensaje
        </label>
        <input
          type="text"
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Escríbenos lo que quieras compartir"
          className={`${
            errors.message ? "border-red-600 bg-red-100" : "border-gray-300"
          }`}
        />
        {errors.message && <p className="">{errors.message}</p>}
      </div>

      <button type="submit" className="">
        Enviar
      </button>

      {success && (
        <div className="">
          <p className="">¡Mensaje enviado con éxito!</p>
        </div>
      )}
    </form>
  );
}

export default Form;
