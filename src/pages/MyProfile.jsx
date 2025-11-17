import React from "react";
import { useAuth } from "../context/AuthContext";

const MyProfile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Mi perfil</h2>

      <div>
        <p>
          <strong>Correo electrónico:</strong> {user?.email}
        </p>
        <p>
          <strong>ID del usuario</strong> {user?.uid}
        </p>

        <button
          onClick={logout}
          className="mt-4 bg-[#7d5940] hover:bg-[#4a2e1e] text-white px-4 py-2 rounded"
        >
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
};

export default MyProfile;
