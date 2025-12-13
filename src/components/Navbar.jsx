import { useState } from "react";
import logo from "../img/logonav.png";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext"; // Importamos el carrito

function Navbar() {
  const { user, isAdmin } = useAuth();
  const { items } = useCart(); // Obtenemos los productos del carrito
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navigation = [
    { name: "Inicio", href: "/" },
    { name: "Sobre nosotras", href: "/about-us" },
    { name: "Menú", href: "/menu" },
    { name: "Contáctanos", href: "/contact-us" },
    { name: "Libro de reclamaciones", href: "/complaints" },
    { name: "Misión y Visión", href: "/mission-vision" },
    {
      name: "Iniciar Sesión",
      href: "/login-form",
      requiresAuth: false,
    },
    { name: "Carrito 🛒", href: "/cart" }, // 🔹 Agregamos el carrito
  ];

  const filteredNavigation = navigation.filter((item) => {
    if (item.name === "Dashboard") {
      return true;
    }
    return true;
  });

  return (
    <header>
      <nav className="fixed top-0 left-0 w-full bg-[#fdf2dd] shadow-md z-50">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Logo Café Aroma"
              className="h-16 w-auto object-contain"
            />
          </div>

          {/* Botón menú para celulares*/}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#9c7042] hover:text-[#704c2b] focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Navegación escritorio */}
          <ul className="hidden md:flex space-x-10">
            {filteredNavigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`font-semibold transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-[#4a2e1e]"
                      : "text-[#704c2b] hover:text-[#9c7042]"
                  }`}
                >
                  {item.name}
                  {/* 🔹 Mostrar cantidad de productos en el carrito */}
                  {item.name === "Carrito 🛒" && items.length > 0 && (
                    <span className="ml-1 text-sm text-red-600">
                      ({items.length})
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Navegación móvil */}
          {isMenuOpen && (
            <div className="md:hidden bg-[#fdf2dd] border-t border-[#e5d3b3]">
              <div className="px-4 pt-2 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? "text-[#4a2e1e] bg-[#f8e9c7]"
                        : "text-[#704c2b] hover:text-[#A59385] hover:bg-[#f8e9c7]"
                    }`}
                  >
                    {item.name}
                    {/* 🔹 Mostrar cantidad también en móvil */}
                    {item.name === "Carrito 🛒" && items.length > 0 && (
                      <span className="ml-1 text-sm text-red-600">
                        ({items.length})
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
