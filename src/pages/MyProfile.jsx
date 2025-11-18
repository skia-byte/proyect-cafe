import React from "react";
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";

const MyProfile = () => {
  const { user, logout } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    skills: [],
    experience: [],
  });

  const loadUserDate = useCallback(async () => {
    if (!user) return;

    try {
      const data = await getUserData(user.uid);
      setUserData(data);

      if (data.teamMember) {
        setFormData(data.teamMember);
      } else {
        setFormData((prev) => ({
          ...prev,
          name: user.displayName || "",
        }));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }

    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadUserDate();
  }, [user, loadUserDate]);

  //Handle inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSkillsChange = (e) => {
    const skills = e.target.value
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);
    setFormData((prev) => ({ ...prev, skills }));
  };

  // Save data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const profileData = {
        ...formData,
        userId: user.uid,
        userEmail: user.email,
      };

      if (userData?.teamMember?.id) {
        await updateTeamMember(userData.teamMember.id, profileData);
      } else {
        await createTeamMember(profileData);
      }

      await loadUserData();
      alert("Perfil actualizado con éxito 💛");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Error al guardar");
    }

    setSaving(false);
  };

  //Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-700"></div>
        <span className="ml-2 text-yellow-700">Cargando perfil...</span>
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
              {userRole === "admin" ? "Administradora" : "Miembro del equipo"}
            </p>
          </div>
        </div>
      </div>

      {/* Profile form */}
      {isTeam ? (
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
                value={formData.skills.join(", ")}
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
              {" "}
              {saving ? "Guardando..." : "Guardar cambios"}{" "}
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center py-10">
          <h3 className="text-lg font-medium text-[#4a2e1e] mb-1">
            Acceso limitado
          </h3>
          <p className="text-[#7d5940]">
            Solo los miembros del equipo pueden editar su perfil
          </p>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
