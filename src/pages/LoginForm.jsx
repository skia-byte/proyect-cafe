import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginForm = () => {
  // 1. Obtener funciones y estados del contexto
  const { user, loginWithEmail, loginWithGoogle, isAdmin } = useAuth();

  // 2. Estados locales para manejar inputs y mensajes
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState(null);
  const navigate = useNavigate(); // Hook para redirecciones

  // 3. Redirigir si ya está logueado y es administrador
  useEffect(() => {
    // Si el usuario existe y es admin, redirigir inmediatamente al dashboard
    if (user && isAdmin) {
      navigate("/dashboard");
    }
  }, [user, isAdmin, navigate]);

  // 4. Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpia errores anteriores
    setMessage(null); // Limpia mensajes anteriores

    try {
      await loginWithEmail(email, password);
      // El useEffect se encargará de la redirección
      setMessage({ type: "success", text: "Sesión iniciada correctamente." });
    } catch (err) {
      // Manejo de errores de Firebase
      if (
        err.code === "auth/user-not-found" ||
        err.code === "auth/wrong-password"
      ) {
        setError(
          "Credenciales incorrectas. Verifique el email y la contraseña."
        );
      } else {
        setError("Error al iniciar sesión. Intente de nuevo.");
      }
    }
  };

  // 5. Manejo de login con Google
  const handleGoogle = async () => {
    setError(""); // Limpia errores anteriores
    setMessage(null); // Limpia mensajes anteriores
    try {
      await loginWithGoogle(); // Llama a la función del contexto
      setMessage({ type: "success", text: "Accediste con Google." });
    } catch (err) {
      setError("Error al iniciar sesión con Google.");
    }
  };

  // 6. Si ya es administrador, no muestres el formulario (esto lo hace useEffect)
  if (user && isAdmin) {
    return (
      <div className="text-center text-yellow-900">
        Redirigiendo al Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 px-4 md:px-8">
      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-yellow-200 rounded-xl shadow-2xl p-6 md:p-8 lg:p-10">
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-yellow-900 mb-6 text-center">
          Iniciar Sesión (Administrador)
        </h3>

        {error && (
          <p className="bg-red-100 text-red-800 p-3 rounded mb-4 text-sm md:text-base font-medium">
            {error}
          </p>
        )}
        {message && (
          <p className="bg-green-100 text-green-800 p-3 rounded mb-4 text-sm md:text-base font-medium">
            {message.text}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-yellow-900 font-semibold mb-1 text-sm md:text-base">
              Correo
            </label>
            <input
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-yellow-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 bg-yellow-50 text-yellow-950"
            />
          </div>
          <div>
            <label className="block text-yellow-900 font-semibold mb-1 text-sm md:text-base">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-yellow-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 bg-yellow-50 text-yellow-950"
            />
          </div>

          {/* Botón de iniciar sesión */}
          <button
            type="submit"
            className="w-full bg-yellow-900 text-yellow-50 py-2 rounded-lg font-semibold hover:bg-yellow-800 transition cursor-pointer"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-grow border-yellow-600" />
          <span className="px-2 text-yellow-900 font-medium">o</span>
          <hr className="flex-grow border-yellow-600" />
        </div>

        {/* Botón Google */}
        <button
          type="button"
          onClick={handleGoogle}
          className="w-full flex items-center justify-center gap-2 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition cursor-pointer"
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
          >
            <path
              fill="#fff"
              d="M24 9.5c3.94 0 7.5 1.44 10.3 3.8l7.2-7.2C37.6 2.9 31.2 0 24 0 14.6 0 6.4 5.4 2.5 13.3l8.4 6.5C12.8 13.2 18 9.5 24 9.5z"
            />
            <path
              fill="#fff"
              d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.4 5.6-5.1 7.3l7.8 6c4.6-4.2 7.1-10.4 7.1-17.8z"
            />
          </svg>
          Acceder con Google
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
