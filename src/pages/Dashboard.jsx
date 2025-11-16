import React from "react";
import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";

import { useAuth } from "../context/AuthContext";
function Dashboard() {
  const { logout, user } = useAuth();

  return (
    <div className="admin-dashboard">
      <h2>Bienvenido, Administrador de Café Aroma</h2>
      <p>Este es el panel central de gestión.</p>

      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
}

export default Dashboard;
