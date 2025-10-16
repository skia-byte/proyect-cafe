import React from "react";
import aboutUsData from "../data/about-us.json";

const AboutUs = () => {
  const { team, company, values } = aboutUsData;

  return (
    <div className="bg-stone-50 text-stone-900">
      {/* Banner */}
      <section className="bg-gradient-to-r from-amber-800 via-amber-600 to-amber-400 h-64 flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="mb-4">
            <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg">
              Descubre quiénes somos
            </h1>
          </div>
          <div>
            <p className="text-white text-base md:text-lg lg:text-xl">
              Somos cuatro amigas que compartimos una pasión por el café, los
              momentos simples y las conexiones genuinas. Creamos Café Aroma
              como un espacio donde cada taza cuenta una historia, y cada visita
              se siente como llegar a casa.
            </p>
          </div>
        </div>
      </section>

      {/* Nuestra historia */}
      <section className="px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-6 md:gap-8">
          <div className="md:w-1/2">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-amber-900 mb-4">
              Nuestra historia: una taza, un sueño
            </h2>
            <p className="text-base md:text-lg lg:text-xl leading-relaxed text-justify">
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
          <div className="md:w-1/2">
            <img
              src={company[0].photo}
              alt="Nuestra Historia"
              className="w-full rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* Fundadoras */}
      <section className="bg-amber-50 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-amber-900">
              Conócenos: las mujeres detrás del aroma
            </h2>
          </div>
          <div className="text-center mb-8">
            <p className="text-base md:text-lg lg:text-xl">
              Nosotras soñamos Café Aroma, lo construimos con amor y lo vivimos
              cada día. Queremos que nos conozcas, porque detrás de cada taza
              hay una historia que nos une.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <article
                key={member.id}
                className="bg-white rounded-lg shadow-md p-4 text-center transform transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="mb-4">
                  <img
                    src={member.photo}
                    alt={`Foto de ${member.name}`}
                    className="w-32 h-32 mx-auto rounded-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-amber-900">
                    {member.name}
                  </h3>
                  <p className="text-sm md:text-base lg:text-lg text-amber-700">
                    {member.role}
                  </p>
                  <p className="text-sm md:text-base lg:text-lg text-stone-700 mt-2">
                    {member.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="bg-amber-100 px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-amber-900">
              Lo que nos mueve
            </h2>
          </div>
          <div className="text-center mb-8">
            <p className="text-base md:text-lg lg:text-xl">
              Cada decisión que tomamos nace desde lo que creemos y sentimos. Te
              invitamos a descubrir lo que nos impulsa y nos representa.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <article
                key={value.id}
                className="bg-white rounded-lg shadow-md p-4 text-center transform transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="mb-4">
                  <img
                    src={value.photo}
                    alt={`Foto de la ${value.title} en Café Aroma`}
                    className="w-50 h-32 mx-auto rounded-xl object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-amber-900 mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm md:text-base lg:text-lg text-stone-700">
                    {value.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
