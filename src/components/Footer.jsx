function Footer() {
  return (
    <footer className="bg-[#4a2e1e] text-[#e4d3ba] py-8">
      <div className="max-w-6cl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <h2 className="text-2xl font-bold">Café Aroma</h2>

        <div className="text-center text-white md:text-right">
          <p className="test-sm">contacto@cafearoma.com</p>
          <p className="text-sm">+51 987 654 321</p>
        </div>

        <div className="border-t border-[#7d5940] mt-6 pt-4 text-center text-[#e4d3ba]">
          <p className="text-sm">
            © 2024 Café Aroma. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
