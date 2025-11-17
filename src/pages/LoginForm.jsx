import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Ajusta esta ruta

const LoginForm = () => {
  // 1. Obtener funciones y estados del contexto
  const { user, loginWithEmail, isAdmin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // 2. Redirigir si ya está logueado y es administrador
  useEffect(() => {
    // Si el usuario existe y es admin, redirigir inmediatamente al dashboard
    if (user && isAdmin) {
      navigate("/dashboard");
    }
  }, [user, isAdmin, navigate]);

  // 3. Manejo del envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Limpiar errores anteriores

    try {
      await loginWithEmail(email, password);
      // El useEffect se encargará de la redirección
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

  // Si ya es administrador, no muestres el formulario (esto lo hace el useEffect)
  if (user && isAdmin) {
    return <div>Redirigiendo al Dashboard...</div>;
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
