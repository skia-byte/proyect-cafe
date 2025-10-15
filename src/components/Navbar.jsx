export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#fdf2idd] shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4">
        <ul className="flex space-x-4 text-brown-800">
          <li>Inicio</li>
          <li>Sobre nosotras</li>
          <li>Menú</li>
          <li>Contactanos</li>
          <li>Libro de reclamaciones</li>
          <li>Misión y Visión</li>
        </ul>
      </div>
    </nav>
  );
}
