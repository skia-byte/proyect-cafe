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
    <div className="login-container mx-auto mt-20 p-6 max-w-md bg-white rounded shadow">
      <h3>Iniciar Sesión (Administrador)</h3>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="m-3"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="m-3"
        />

        <button
          type="submit"
          className="flex m-3 bg-[#8b5e3c] hover:bg-[#6d482e] text-white font-bold py-2 px-4 rounded"
        >
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
