import React, { useEffect, useState } from "react";
import {
  getAllProducts,
  addProduct,
  deleteProduct,
} from "../FireBase/productsService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    origin: "",
  });
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error al cargar los productos:", err);
      alert("Error al cargar los productos");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      alert("Tienes que poner nombre y precio");
      return;
    }
    const newProduct = {
      name: form.name,
      price: parseFloat(form.price),
      description: form.description || "",
      origin: form.origin || "",
    };
    setSaving(true);
    try {
      await addProduct(newProduct);
      setForm({ name: "", price: "", description: "", origin: "" });
      fetchProducts();
    } catch (err) {
      console.error("Error al agregar el producto:", err);
      alert("Error al agregar el producto");
    }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "¿Estás seguro de que quieres eliminar este producto?"
    );
    if (!ok) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error al eliminar el producto:", err);
      alert("No se pudo eliminar el producto");
    }
  };

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Productos</h2>
          <p className="text-sm text-gray-500">
            Gestiona el menú de la cafetería
          </p>
        </div>
      </div>

      {/* FORMULARIO */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Agregar nuevo producto</h3>

        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nombre del producto"
              className="border rounded px-3 py-2"
              required
            />

            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Precio (ej. 3.50)"
              type="number"
              step="0.01"
              className="border rounded px-3 py-2"
              required
            />

            <input
              name="origin"
              value={form.origin}
              onChange={handleChange}
              placeholder="Origen (ej. Colombia Supremo)"
              className="border rounded px-3 py-2"
            />
          </div>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Descripción"
            className="w-full border rounded px-3 py-2"
            rows={3}
          />

          <div className="flex gap-3">
            <button
              disabled={saving}
              type="submit"
              className="border-[#7d5940] hover:bg-[#4a2e1e]  text-white px-4 py-2 rounded"
            >
              {saving ? "Guardando..." : "Agregar Producto"}
            </button>

            <button
              type="button"
              onClick={() =>
                setForm({ name: "", price: "", description: "", origin: "" })
              }
              className="border rounded px-4 py-2"
            >
              Limpiar
            </button>
          </div>
        </form>
      </div>

      {/* LISTA DE PRODUCTOS */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium mb-4">Lista de productos</h3>

        {loading ? (
          <p>Cargando productos...</p>
        ) : products.length === 0 ? (
          <p>No hay productos disponibles.</p>
        ) : (
          <div className="space-y-4">
            {products.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between border rounded p-3"
              >
                <div>
                  <h4 className="font-semibold">
                    {p.name}{" "}
                    <span className="text-sm text-gray-500">
                      - ${p.price?.toFixed(2)}
                    </span>
                  </h4>
                  <p className="text-sm text-gray-600">{p.description}</p>
                  {p.origin && (
                    <p className="text-xs text-gray-400">Origen: {p.origin}</p>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
