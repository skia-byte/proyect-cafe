import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";

const MyProfile = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    skills: [],
    experience: [],
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;

    setFormData({
      name: user.displayName || "",
      role: "",
      bio: "",
      skills: "",
      experience: "",
    });

    setLoading(false);
  }, [user]);

  //Handle inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillsChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      skills: e.target.value,
    }));
  };

  // Save data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    setTimeout(() => {
      alert("Perfil actualizado con éxito");
      setSaving(false);
    }, 700);
  };

  //Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#9c7042]"></div>
        <span className="ml-2 text-[#9c7042]">Cargando perfil...</span>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-[#4a2e1e]">Mi Perfil</h2>
        <p className="text-[#7d5940]">Gestiona tu información personal</p>
      </div>

      {/* User info card */}
      <div className="bg-[#f2e7d9] rounded-lg p-6 mb-6 shadow">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-[#7d5940] rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
            {(user?.displayName || user?.email || "U").charAt(0).toUpperCase()}
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#4a2e1e]">
              {user?.displayName || "Usuario"}
            </h3>
            <p className="text-[#7d5940]">{user?.email}</p>
            <p className="text-sm text-[#4a2e1e]">
              Miembro del equipo de Café Aroma
            </p>
          </div>
        </div>
      </div>

      {/* Profile form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name and role */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-[#4a2e1e]">
              Nombre completo
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Tu nombre completo"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-[#4a2e1e]">
              Rol
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Ej: Administradora, Encargada"
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium mb-1 text-[#4a2e1e]">
            Biografía
          </label>
          <textarea
            name="bio"
            rows="4"
            value={formData.bio}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Cuéntanos sobre ti..."
          />
        </div>

        {/* Skills + experience */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-[#4a2e1e]">
              Habilidades
            </label>
            <input
              type="text"
              value={formData.skills}
              onChange={handleSkillsChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Atención al cliente, organización..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-[#4a2e1e]">
              Años de experiencia
            </label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Ej: 2 años"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="bg-[#7d5940] text-white px-6 py-2 rounded-md hover:bg-[#4a2e1e] disabled:opacity-60"
          >
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
