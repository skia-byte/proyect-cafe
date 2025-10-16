<<<<<<< HEAD
function ContactUs() {
  return <h1>Contactanos</h1>;
=======
import React from "react";
import Form from "../components/Form";

function ContactUs() {
  return (
    <div className="">
      {/* Banner */}
      <section className="">
        <div className="">
          <div className="">
            <h1 className="">Conecta con Café Aroma</h1>
          </div>
          <div className="">
            <p className="">
              Cada conversación comienza con un gesto. Escríbenos, que aquí
              siempre hay espacio para tus palabras.
            </p>
          </div>
        </div>
      </section>

      {/* Información + Formulario */}
      <section className="">
        {/* Izquierda: contacto y redes */}
        <section className="">
          {/* Información de contacto */}
          <div className="">
            <h2 className="">Estamos cerca de ti</h2>
            <address className="">
              <h3 className="">📧Email: </h3>
              <p className="">
                <a href="mailto:contacto@cafearoma.pe" className="">
                  contacto@cafearoma.pe
                </a>
              </p>

              <h3 className="">📞Teléfono: </h3>
              <p className="">
                <a href="tel:+51987654321" className="">
                  +51 987 654 321
                </a>
              </p>
            </address>

            <div className="">
              <h3 className="">🏢Sedes:</h3>
              <ul className="">
                <li className="">
                  📍 Jirón Huanta 910, Lima 15001 (Centro de Lima)
                </li>
                <li className="">📍 Av. Abancay 1024, Lima 15001</li>
                <li className="">
                  📍 Jr. Manuel Ascencio Segura 186, Lince 15073 (Av. Arequipa)
                </li>
              </ul>
            </div>

            <div className="">
              <h3 className="">🕒Horario:</h3>
              <div className="">
                <p className="">Lunes a sábado: 8:00 a.m. – 8:00 p.m.</p>
                <p className="">Domingo: 9:00 a.m. – 6:00 p.m.</p>
              </div>
            </div>
          </div>

          {/* Redes sociales */}
          <div className="">
            <h2 className="">El café también se comparte</h2>
            <ul className="">
              <li className="">
                <h3 className="">TikTok: </h3>
                <p className="">
                  <a
                    href="https://www.tiktok.com/@cafearoma.pe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                  >
                    @cafearoma.pe
                  </a>
                </p>
              </li>

              <li className="">
                <h3 className="">Instagram: </h3>
                <p className="">
                  <a
                    href="https://www.instagram.com/cafearoma.pe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                  >
                    @cafearoma.pe
                  </a>
                </p>
              </li>

              <li className="">
                <h3 className="">Facebook: </h3>
                <p className="">
                  <a
                    href="https://www.facebook.com/cafearoma.pe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=""
                  >
                    Café Aroma Perú
                  </a>
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/* Derecha: formulario */}
        <section className="">
          <div className="">
            <Form />
          </div>
        </section>
      </section>

      {/* Mapa */}
      <section className="">
        <div className="">
          <div className="">
            <h2 className="">Ven, el café se vive mejor en persona</h2>
          </div>
          <div className="">
            <p className="">
              Tres espacios en Lima donde el café se convierte en encuentro.
              Ven, te esperamos con una taza y una sonrisa.
            </p>
          </div>
        </div>
        <div className="">
          <iframe
            title="Mapa Café Aroma"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.000000000000!2d-77.042000000000!3d-12.046000000000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8c000000000%3A0x0000000000000000!2sLima%2C%20Peru!5e0!3m2!1ses!2spe!4v0000000000000"
            loading="lazy"
            className=""
          ></iframe>
        </div>
      </section>
    </div>
  );
>>>>>>> ebed073d23a2834b54730e791a04eef7f78fad52
}

export default ContactUs;
