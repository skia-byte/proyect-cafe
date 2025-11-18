import React from "react";
import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Dashboard() {
  const { logout, user } = useAuth();

  return (
    <div className="admin-dashboard mt-24 px-4 flex justify-center">
      <div className="bg-[#f2e7d9] shadow-xl rounded-xl p-8 w-full max-w-2xl">
        <h2 className="text-3xl font bold text-center mb-2 text-[#4a2e1e]">
          Bienvenido, Administrador de Café Aroma
        </h2>
        <p className="text-center text-[#9c7042] mb-8">
          Este es el panel central de gestión.
        </p>

        {/* Menú del dashboard*/}
        <div className="bg-white shadow rounded p-4 w-full max-w-md mx-auto">
          <h3 className="text-xl font-semibold mb-3">Navegación</h3>

          <ul className="space-y-3">
            <li>
              <Link
                to="/myprofile"
                className="block px-4 py-3 bg-[#7d5940] text-white hover:bg-[#4a2e1e] rounded text-lg"
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
