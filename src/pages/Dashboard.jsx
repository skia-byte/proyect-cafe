import React from "react";
import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Dashboard() {
  const { logout, user } = useAuth();

  return (
    <div className="admin-dashboard">
      <h2>Bienvenido, Administrador de Café Aroma</h2>
      <p>Este es el panel central de gestión.</p>

      {/* Menú del dashboard*/}
      <div className="bg-white shadow rounded p-4 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-3">Navegación</h3>

        <ul className="space-y-2">
          <li>
            <Link
              to="/myprofile"
              className="block px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded"
            >
              Mi perfil
            </Link>
          </li>

          <li>
            <Link
              to="/dashboard/products"
              className="block px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded"
            >
              Gestión de productos
            </Link>
          </li>

          <li>
            <Link to="/dashboard/team" 
            className="block px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded"
            >
              Gestión del equipo

            </Link>
          </li>

          <li>
            <Link to="/dashboard/skills"
            className="block px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded"
            >
              Gestion de habilidades
            </Link>
          </li>

          


        </ul>
      </div>

      <button
        onClick={logout}
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Cerrar Sesión
      </button>
    </div>
  );
}

export default Dashboard;
