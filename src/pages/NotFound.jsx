import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-amber-800 text-[#9c7042] px-4 text-center">
      <h1 className="text-8xl font-bold text-amber-900 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Página no encontrada</h2>
      <p className="text-[#9c7042] mb-6 max-w-md">
        Lo sentimos, la página que buscas no existe o ha sido movida.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-amber-700 text-white rounded-lg hover:bg-amber-900 transition"
      >
        Volver al inicio
      </Link>
    </section>
  );
}

export default NotFound;
