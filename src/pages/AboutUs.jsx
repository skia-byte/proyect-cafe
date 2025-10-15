import React from "react";
import aboutUsData from "../data/about-us.json";

function AboutUs() {
  return (
    <div className="">
      {/* Banner */}
      <section className="">
        <div className="">
          <div className="">
            <h1 className="">Descubre quiénes somos en Café Aroma</h1>
          </div>
          <div>
            <p className="">
              Somos cuatro amigas que compartimos una pasión por el café, los
              momentos simples y las conexiones genuinas. Creamos Café Aroma
              como un espacio donde cada taza cuenta una historia, y cada visita
              se siente como llegar a casa.
            </p>
          </div>
        </div>
      </section>

      {/* Nuestra historia */}
      <section className="">
        <div className="">
          <div className="">
            <h2 className="">Nuestra historia: una taza, un sueño</h2>
          </div>
          <div className="">
            <p className="">
              Fundamos Café Aroma en el año 2025, en Lima, Perú, con la ilusión
              de crear un lugar donde el café se viva con emoción. Lo que
              comenzó como una idea entre amigas se convirtió en un rincón lleno
              de aromas, sonrisas y memorias compartidas.
              <br />
              Hoy somos un equipo de 30 personas que trabajamos con dedicación
              para que cada experiencia en Café Aroma sea especial. Nos
              esforzamos cada día para ofrecer más que café: queremos regalar
              momentos que reconforten, inspiren y conecten.
            </p>
          </div>
          <div className="">
            <img src={company[0].photo} alt="Nuestra Historia" className="" />
          </div>
        </div>
      </section>

      {/* Fundadoras */}
      <section className="">
        <div className="">
          <div className="">
            <h2 className="">Conócenos: las mujeres detrás del aroma</h2>
          </div>
          <div className="">
            <p className="">
              Nosotras soñamos Café Aroma, lo construimos con amor y lo vivimos
              cada día. Queremos que nos conozcas, porque detrás de cada taza
              hay una historia que nos une.
            </p>
          </div>
          <div className="">
            {aboutUsData.team.map((member) => (
              <article key={member.id} className="">
                <div className="">
                  <img
                    src={member.photo}
                    alt={`Foto de ${member.name}`}
                    className=""
                  />
                </div>
                <div className="">
                  <h3 className="">{member.name}</h3>
                  <p className="">{member.role}</p>
                  <p className="">{member.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="">
        <div className="">
          <div className="">
            <h2 className="">Lo que nos mueve</h2>
          </div>
          <div className="">
            <p className="">
              Cada decisión que tomamos nace desde lo que creemos y sentimos. Te
              invitamos a descubrir lo que nos impulsa y nos representa.
            </p>
          </div>
          <div className="">
            {aboutUsData.values.map((value) => (
              <article key={value.id} className="">
                <div className="">
                  <img
                    src={value.photo}
                    alt={`Foto de la ${value.title} en Café Aroma`}
                    className=""
                  />
                </div>
                <div className="">
                  <h3 className="">{value.title}</h3>
                  <p className="">{value.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
