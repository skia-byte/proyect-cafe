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
import { useAuth } from "../context/AuthContext"; // contexto de auth

function Team() {
  const { isAdmin, user } = useAuth(); // verificación de admin
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    department: "",
    bio: "",
    skills: [],
  });

  const loadTeamMembers = () => {
    const q = query(collection(db, "team"), orderBy("name"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const members = [];
      querySnapshot.forEach((doc) => {
        members.push({ id: doc.id, ...doc.data() });
      });
      setTeamMembers(members);
      setLoading(false);
    });
    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = loadTeamMembers();
    return () => unsubscribe();
  }, []);

  // resetear formulario
  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      email: "",
      department: "",
      bio: "",
      skills: [],
    });
    setEditingMember(null);
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

// habilidades
const handleSkillsChange = (e) => {
  const inputValue = e.target.value;
  setFormData((prev) => ({
    ...prev,
    skills: inputValue
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill),
  }));
};
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const memberData = {
      ...formData,
      userId: editingMember?.userId || user?.uid,
      userEmail: editingMember?.userEmail || user?.email,
      updatedAt: new Date(),
    };

    if (!editingMember) {
      memberData.createdAt = new Date();
    }

    if (editingMember) {
      const memberRef = doc(db, "team", editingMember.id);
      await updateDoc(memberRef, memberData);
    } else {
      await addDoc(collection(db, "team"), memberData);
    }

    resetForm();
  } catch (error) {
    console.error("Error al guardar:", error);
    alert("Error al guardar el miembro del equipo");
    setLoading(false);
  }
};
  // función de edición
  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name || "",
      role: member.role || "",
      email: member.email || "",
      department: member.department || "",
      bio: member.bio || "",
      skills: member.skills || [],
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este miembro?")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "team", id));
    } catch (error) {
      console.error("Error eliminando miembro: ", error);
      alert("Error al eliminar el miembro del equipo"); // ✅ AGREGAR: alert
    }
  };

  if (!isAdmin) {
    return (
      <div className="text-center py-8">
        <div className="text-4xl mb-4">🚫</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Acceso Denegado
        </h3>
        <p className="text-gray-600">
          Solo los administradores pueden gestionar los miembros del equipo.
        </p>
      </div>
    );
  }
  if (loading && teamMembers.length === 0) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="ml-2 text-gray-600">
            Cargando miembros del equipo...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Gestión de Equipo
          </h2>
          <p className="text-gray-600">Administra los miembros del equipo</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Agregar Miembro
        </button>
      </div>

      {/*formulario condicional*/}
      {showForm && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            {editingMember ? "Editar Miembro" : "Agregar Nuevo Miembro"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Rol *
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Departamento *
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Biografía
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Habilidades
              </label>
              <input
              type="text"
              value={skillsInput}
              onChange={handleSkillsInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="ej: Liderazgo, Programación, Diseño"
              />            
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {editingMember ? "Actualizar" : "Agregar"} Miembro
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-lg font-bold">
                  {member.name?.charAt(0) || "U"}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-gray-900">
                  {member.name}
                </h4>
                <p className="text-sm text-blue-600">{member.role}</p>
              </div>
            </div>

            {member.bio && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {member.bio}
              </p>
            )}

            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Email:</span> {member.email}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <span className="font-medium">Departamento:</span>{" "}
              {member.department}
            </p>

            {member.skills && member.skills.length > 0 && (
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-500 mb-2">
                  HABILIDADES
                </p>
                <div className="flex flex-wrap gap-1">
                  {member.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {member.skills.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{member.skills.length - 3} más
                    </span>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-end items-center pt-4 border-t">
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(member)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {teamMembers.length === 0 && !loading && (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">👥</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No hay miembros del equipo
          </h3>
          <p className="text-gray-600 mb-4">
            Comienza agregando el primer miembro del equipo.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700"
          >
            Agregar Primer Miembro
          </button>
        </div>
      )}
    </div>
  );
}

export default Team;
