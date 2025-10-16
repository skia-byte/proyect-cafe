import React from "react";
import Form from "../components/Form";

const ContactUs = () => {
  return (
    <div className="bg-stone-50 text-stone-900">
      {/* Banner */}
      <section className="bg-gradient-to-r from-amber-800 via-amber-600 to-amber-400 h-64 flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="mb-4">
            <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
              Conecta con Café Aroma
            </h1>
          </div>
          <div>
            <p className="text-white text-base md:text-lg lg:text-xl">
              Cada conversación comienza con un gesto. Escríbenos, que aquí
              siempre hay espacio para tus palabras.
            </p>
          </div>
        </div>
      </section>

      {/* Información + Formulario */}
      <section className="flex flex-col lg:flex-row gap-8 min-h-[600px]">
        {/* Izquierda: contacto y redes */}
        <section className="flex-1 bg-white rounded-lg shadow-md transition duration-300 p-6 flex flex-col justify-between">
          {/* Información de contacto */}
          <div>
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-amber-900 mb-4">
              Estamos cerca de ti
            </h2>
            <address className="not-italic space-y-2 text-sm md:text-base lg:text-lg">
              <h3 className="font-medium">📧Email: </h3>
              <p>
                <a
                  href="mailto:contacto@cafearoma.pe"
                  className="text-amber-800 hover:underline"
                >
                  contacto@cafearoma.pe
                </a>
              </p>

              <h3 className="font-medium">📞Teléfono: </h3>
              <p>
                <a
                  href="tel:+51987654321"
                  className="text-amber-800 hover:underline"
                >
                  +51 987 654 321
                </a>
              </p>
            </address>

            <div className="pt-1.5 mt-1.5">
              <h3 className="font-medium mb-2">🏢Sedes:</h3>
              <ul className="space-y-1 text-sm md:text-base lg:text-lg">
                <li>📍 Jirón Huanta 910, Lima 15001 (Centro de Lima)</li>
                <li>📍 Av. Abancay 1024, Lima 15001</li>
                <li>
                  📍 Jr. Manuel Ascencio Segura 186, Lince 15073 (Av. Arequipa)
                </li>
              </ul>
            </div>

            <div className="pt-1.5 mt-1.5">
              <h3 className="font-medium mb-2">🕒Horario:</h3>
              <div className="space-y-1 text-sm md:text-base lg:text-lg">
                <p>Lunes a sábado: 8:00 a.m. – 8:00 p.m.</p>
                <p>Domingo: 9:00 a.m. – 6:00 p.m.</p>
              </div>
            </div>
          </div>

          {/* Redes sociales */}
          <div className="pt-4 border border-t-2 border-amber-200 mt-6">
            <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-amber-900 mb-4">
              El café también se comparte
            </h2>
            <ul className="space-y-2 text-sm md:text-base lg:text-lg">
              <li>
                <h3 className="font-medium">TikTok: </h3>
                <p>
                  <a
                    href="https://www.tiktok.com/@cafearoma.pe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-800 hover:underline"
                  >
                    @cafearoma.pe
                  </a>
                </p>
              </li>

              <li>
                <h3 className="font-medium">Instagram: </h3>
                <p>
                  <a
                    href="https://www.instagram.com/cafearoma.pe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-800 hover:underline"
                  >
                    @cafearoma.pe
                  </a>
                </p>
              </li>

              <li>
                <h3 className="font-medium">Facebook: </h3>
                <p>
                  <a
                    href="https://www.facebook.com/cafearoma.pe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-amber-800 hover:underline"
                  >
                    Café Aroma Perú
                  </a>
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* Derecha: formulario */}
        <section className="flex-1 flex items-stretch">
          <div className="transition duration-300 p-4 md:p-6 lg:p-8 w-full flex flex-col justify-between">
            <Form />
          </div>
        </section>
      </section>

      {/* Mapa */}
      <section className="text-center space-y-6 pt-12 px-4 md:px-12 lg:px-24">
        <div>
          <div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-amber-900">
              Ven, el café se vive mejor en persona
            </h2>
          </div>
          <div>
            <p className="text-base md:text-lg max-w-xl mx-auto">
              Tres espacios en Lima donde el café se convierte en encuentro.
              Ven, te esperamos con una taza y una sonrisa.
            </p>
          </div>
        </div>
        <div>
          <iframe
            title="Mapa Café Aroma"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.000000000000!2d-77.042000000000!3d-12.046000000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8c000000000%3A0x0000000000000000!2sLima%2C%20Peru!5e0!3m2!1ses!2spe!4v0000000000000"
            loading="lazy"
            className="w-full h-64 md:h-96 lg:h-[600px] rounded-lg"
          ></iframe>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
