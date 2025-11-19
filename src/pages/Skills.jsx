import { useState, useEffect } from "react";
import { db } from "../FireBase/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";

function SkillsManager() {
  const { isAdmin, user } = useAuth();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    level: "Intermedio",
    icon: "⭐",
  });

  const loadSkills = () => {
    const q = query(collection(db, "skills"), orderBy("name"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const skillsData = [];
      querySnapshot.forEach((doc) => {
        skillsData.push({ id: doc.id, ...doc.data() });
      });
      setSkills(skillsData);
      setLoading(false);
    });
    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = loadSkills();
    return () => unsubscribe();
  }, []);

  // Resetear formulario
  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      description: "",
      level: "Intermedio",
      icon: "⭐",
    });
    setEditingSkill(null);
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const skillData = {
        ...formData,
        userId: editingSkill?.userId || user?.uid,
        userEmail: editingSkill?.userEmail || user?.email,
        createdAt: editingSkill ? undefined : new Date(),
        updatedAt: new Date(),
      };

      if (editingSkill) {
        const skillRef = doc(db, "skills", editingSkill.id);
        await updateDoc(skillRef, skillData);
      } else {
        await addDoc(collection(db, "skills"), skillData);
      }

      resetForm();
    } catch (error) {
      console.error("Error al guardar:", error);
      alert("Error al guardar la habilidad");
      setLoading(false);
    }
  };

  // edición
  const handleEdit = (skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name || "",
      category: skill.category || "",
      description: skill.description || "",
      level: skill.level || "Intermedio",
      icon: skill.icon || "⭐",
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta habilidad?")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "skills", id));
    } catch (error) {
      console.error("Error eliminando habilidad: ", error);
      alert("Error al eliminar la habilidad");
    }
  };

  // habilidades de cafetería
  const categories = [
    "Barismo",
    "Atención al Cliente",
    "Gestión",
    "Cocina",
    "Repostería",
    "Limpieza",
    "Administración",
    "Marketing",
  ];

  const levels = ["Básico", "Intermedio", "Avanzado", "Experto"];
  const icons = ["⭐", "☕", "🎯", "💼", "👨‍🍳", "📊", "💬", "🔧"];

  if (!isAdmin) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">🚫</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Acceso Denegado
        </h3>
        <p className="text-gray-600">
          Solo los administradores pueden gestionar las habilidades.
        </p>
      </div>
    );
  }

  if (loading && skills.length === 0) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
          <span className="ml-2 text-gray-600">Cargando habilidades...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Gestión de Habilidades
          </h2>
          <p className="text-gray-600">
            Administra las habilidades del equipo de la cafetería
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-amber-600 text-white px-4 py-2 rounded-md font-medium hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
        >
          + Agregar Habilidad
        </button>
      </div>

      {/* Formulario condicional */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingSkill ? "Editar Habilidad" : "Agregar Nueva Habilidad"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de la Habilidad *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="ej: Preparación de Cappuccino"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoría *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">Seleccionar categoría</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nivel *
                </label>
                <select
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  {levels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Icono *
                </label>
                <select
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  {icons.map((icon) => (
                    <option key={icon} value={icon}>
                      {icon} {icon}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Describe la habilidad y su importancia en la cafetería..."
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-amber-600 text-white px-6 py-2 rounded-md font-medium hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                {editingSkill ? "Actualizar" : "Agregar"} Habilidad
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grid de habilidades */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-lg">{skill.icon || "⭐"}</span>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900">
                  {skill.name}
                </h4>
                <p className="text-sm text-amber-600">{skill.category}</p>
              </div>
            </div>

            {skill.description && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {skill.description}
              </p>
            )}

            <div className="flex items-center justify-between mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  skill.level === "Básico"
                    ? "bg-green-100 text-green-800"
                    : skill.level === "Intermedio"
                    ? "bg-yellow-100 text-yellow-800"
                    : skill.level === "Avanzado"
                    ? "bg-orange-100 text-orange-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {skill.level}
              </span>

              {skill.userEmail && (
                <span className="text-xs text-gray-500">
                  Por: {skill.userEmail}
                </span>
              )}
            </div>

            <div className="flex justify-end items-center pt-4 border-t">
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(skill)}
                  className="text-amber-600 hover:text-amber-700 text-sm font-medium"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(skill.id)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Estado vacío */}
      {skills.length === 0 && !loading && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">⭐</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay habilidades registradas
          </h3>
          <p className="text-gray-600 mb-4">
            Comienza agregando la primera habilidad del equipo.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-amber-600 text-white px-4 py-2 rounded-md font-medium hover:bg-amber-700"
          >
            Agregar Primera Habilidad
          </button>
        </div>
      )}
    </div>
  );
}

export default SkillsManager;
