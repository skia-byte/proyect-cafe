import logo from "../img/logonav.png";
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
          <li className="hover:text-[#9c7042] cursor-pointer">Inicio</li>
          <li className="hover:text-[#9c7042] cursor-pointer">
            Sobre nosotras
          </li>
          <li className="hover:text-[#9c7042] cursor-pointer">Menú</li>
          <li className="hover:text-[#9c7042] cursor-pointer">Contactanos</li>
          <li className="hover:text-[#9c7042] cursor-pointer">
            Libro de reclamaciones
          </li>
          <li className="hover:text-[#9c7042] cursor-pointer">
            Misión y Visión
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
