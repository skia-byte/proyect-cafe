import { useState, useEffect } from "react";
import { db } from "../FireBase/firebase";
import { 
  collection, addDoc, updateDoc, deleteDoc, doc, onSnapshot, 
  query, orderBy, where 
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";


const StarRating = ({ stars = 0, onChange = null }) => {
  return (
    <div className="flex space-x-1 text-2xl">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!onChange}
          onClick={() => onChange && onChange(star)}
          className={`${stars >= star ? "text-amber-500" : "text-gray-300"} ${
            onChange ? "cursor-pointer hover:text-amber-400" : "cursor-default"
          } transition-colors`}
        >
          ★
        </button>
      ))}
    </div>
  );
};


const starsToLevel = (stars) => {
  if (stars <= 1) return "Básico";
  if (stars === 2) return "Básico+";
  if (stars === 3) return "Intermedio";
  if (stars === 4) return "Avanzado";
  if (stars === 5) return "Experto";
  return "Básico";
};

function EmployeeSkillsManager() {
  const { isAdmin, user } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [skills, setSkills] = useState([]);
  const [employeeSkills, setEmployeeSkills] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);


  useEffect(() => {
    const unsubEmployees = onSnapshot(
      query(collection(db, "employees"), orderBy("name")),
      (snapshot) => {
        const list = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setEmployees(list);
        if (list.length > 0 && !selectedEmployee) {
          setSelectedEmployee(list[0].id);
        }
      }
    );

    const unsubSkills = onSnapshot(
      query(collection(db, "skills"), orderBy("name")),
      (snapshot) => {
        setSkills(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      }
    );

    // empleado seleccionado
    let unsubEvaluations = () => {};
    if (selectedEmployee) {
      const q = query(
        collection(db, "employee_skills"),
        where("employeeId", "==", selectedEmployee),
        orderBy("skillId")
      );

      unsubEvaluations = onSnapshot(q, (snapshot) => {
        setEmployeeSkills(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      });
    }

    return () => {
      unsubEmployees();
      unsubSkills();
      unsubEvaluations();
    };
  }, [selectedEmployee]);


  const handleSave = async (e) => {
    e.preventDefault();

    if (!currentSkill) return;

    const data = {
      employeeId: selectedEmployee,
      skillId: currentSkill.id,
      skillName: currentSkill.name,
      level: starsToLevel(currentSkill.stars),
      stars: currentSkill.stars,
      notes: currentSkill.notes || "",
      evaluatedBy: user?.email || "N/A",
      lastEvaluation: new Date(),
    };

    try {
      if (currentSkill.evalId) {
        await updateDoc(doc(db, "employee_skills", currentSkill.evalId), data);
      } else {
        await addDoc(collection(db, "employee_skills"), data);
      }

      setShowForm(false);
      setCurrentSkill(null);
    } catch (err) {
      console.error(err);
      alert("Error al guardar");
    }
  };


  const handleDeleteEvaluation = async (evalId) => {
    if (!window.confirm("¿Estás seguro de eliminar esta evaluación?")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "employee_skills", evalId));
    } catch (error) {
      console.error("Error eliminando evaluación:", error);
      alert("Error al eliminar la evaluación");
    }
  };


  const startEvaluation = (skill) => {
    const existing = employeeSkills.find(
      (e) => e.skillId === skill.id && e.employeeId === selectedEmployee
    );

    setCurrentSkill({
      id: skill.id,
      name: skill.name,
      stars: existing ? existing.stars : 3,
      notes: existing ? existing.notes : "",
      evalId: existing ? existing.id : null,
    });

    setShowForm(true);
  };


  if (!isAdmin) {
    return (
      <div className="text-center py-8">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Acceso Denegado</h3>
        <p className="text-gray-600">Solo los administradores pueden gestionar evaluaciones.</p>
      </div>
    );
  }


  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Evaluación de Habilidades</h2>

      {/* Selector empleado */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Empleado:
        </label>
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
          className="w-full md:w-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        >
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.name}
            </option>
          ))}
        </select>
      </div>

      {/* Formulario evaluación */}
      {showForm && currentSkill && (
        <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Evaluar: {currentSkill.name}
          </h3>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nivel:</label>
              <StarRating
                stars={currentSkill.stars}
                onChange={(stars) =>
                  setCurrentSkill((prev) => ({ ...prev, stars }))
                }
              />
              <p className="text-sm text-gray-500 mt-1">
                {starsToLevel(currentSkill.stars)}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notas:</label>
              <textarea
                value={currentSkill.notes}
                onChange={(e) =>
                  setCurrentSkill((prev) => ({ ...prev, notes: e.target.value }))
                }
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Observaciones..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="bg-amber-600 text-white px-6 py-2 rounded-md font-medium hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 cursor-pointer"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Lista habilidades */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill) => {
          const evaluation = employeeSkills.find(
            (e) => e.skillId === skill.id && e.employeeId === selectedEmployee
          );

          return (
            <div key={skill.id} className="bg-white border border-gray-200 p-4 rounded-lg hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900">{skill.name}</h4>
                  <p className="text-sm text-gray-600">{skill.category}</p>
                </div>
                <span className="text-xl">{skill.icon}</span>
              </div>

              {evaluation ? (
                <div className="space-y-3">
                  <StarRating stars={evaluation.stars} />
                  <p className="text-sm text-gray-600">{evaluation.level}</p>
                  {evaluation.notes && (
                    <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">📝 {evaluation.notes}</p>
                  )}
                  <div className="flex justify-between items-center pt-2">
                    <button
                      onClick={() => startEvaluation(skill)}
                      className="text-amber-600 hover:text-amber-700 text-sm font-medium cursor-pointer"
                    >
                      Re-evaluar
                    </button>
                    <button
                      onClick={() => handleDeleteEvaluation(evaluation.id)}
                      className="text-red-600 hover:text-red-700 text-sm font-medium cursor-pointer"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => startEvaluation(skill)}
                  className="text-amber-600 hover:text-amber-700 text-sm font-medium cursor-pointer"
                >
                  + Evaluar
                </button>
              )}
            </div>
          );
        })}
      </div>

      {skills.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No hay habilidades configuradas.</p>
        </div>
      )}
    </div>
  );
}

export default EmployeeSkillsManager;