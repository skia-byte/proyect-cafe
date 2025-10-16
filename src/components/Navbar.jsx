import logo from "../img/logonav.png";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#fdf2dd] shadow-md z-50">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={logo}
            alt="Logo Café Aroma"
            className="h-16 w-auto object-contain"
          />
        </div>
        <ul className="flex space-x-10 text-shadow-amber-900">
          <li>
            {" "}
            <Link to="/" className="hover:text-[#9c7042] cursor-pointer">
              Inicio
            </Link>
          </li>
          <li>
            {" "}
            <Link
              to="/about-us"
              className="hover:text-[#9c7042] cursor-pointer"
            >
              Sobre nosotras
            </Link>
          </li>
          <li>
            <Link to="/menu" className="hover:text-[#9c7042] cursor-pointer">
              Menú
            </Link>
          </li>
          <li>
            <Link
              to="/contact-us"
              className="hover:text-[#9c7042] cursor-pointer"
            >
              Contactanos
            </Link>
          </li>
          <li>
            {" "}
            <Link
              to="/complaints"
              className="hover:text-[#9c7042] cursor-pointer"
            >
              Libro de reclamaciones
            </Link>
          </li>
          <li>
            <Link
              to="/mission-vision"
              className="hover:text-[#9c7042] cursor-pointer"
            >
              Misión y Visión
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
