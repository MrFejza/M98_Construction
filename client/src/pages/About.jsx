import React from 'react';
import { FaBriefcase, FaCalendarAlt, FaUsers, FaTachometerAlt } from 'react-icons/fa';

const About = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Rreth Nesh</h1>
          <p className="text-lg mb-8">
            M98 Construction është lider në industrinë e ndërtimit me përvojë të pasur që nga viti 1996. Ne ofrojmë shërbime të shumta për të realizuar projektet tuaja me profesionalizëm dhe cilësi të lartë.
          </p>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">Shërbimet Tonë</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaBriefcase className="text-4xl mb-4 mx-auto text-blue-600" />
              <h3 className="text-xl font-bold mb-2">Menaxhim Projektesh</h3>
              <p>Menaxhojmë çdo aspekt të projektit tuaj, duke siguruar që gjithçka të shkojë sipas planit.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaCalendarAlt className="text-4xl mb-4 mx-auto text-blue-600" />
              <h3 className="text-xl font-bold mb-2">Renovime</h3>
              <p>Ofrojmë renovime të brendshme dhe të jashtme për të freskuar hapësirat tuaja.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaUsers className="text-4xl mb-4 mx-auto text-blue-600" />
              <h3 className="text-xl font-bold mb-2">Ekip Profesionist</h3>
              <p>Ekipi ynë është i përkushtuar dhe i kualifikuar për të ofruar rezultate të shkëlqyera.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <FaTachometerAlt className="text-4xl mb-4 mx-auto text-blue-600" />
              <h3 className="text-xl font-bold mb-2">Cilësi dhe Efikasitet</h3>
              <p>Sigurojmë cilësi të lartë dhe përfundim të shpejtë të projekteve.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Major Projects */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">Projektet Kryesore</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-2">Kalaja e Gjirokastrës</h3>
              <p>Rregullim i infrastrukturës dhe punë restaurimi në një nga monumentet më të rëndësishme të Shqipërisë.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-2">Muzeu Kombëtar</h3>
              <p>Rikonstruksion dhe përmirësim i hapësirave për ekspozita dhe vizitorë.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-2">Vila dhe Apartamente</h3>
              <p>Rikonstruksion të plotë dhe modernizim të vilave dhe apartamenteve në të gjithë Shqipërinë.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-200 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Na Kontaktoni</h2>
          <p className="text-lg mb-8">
            Keni pyetje apo dëshironi të diskutoni për projektin tuaj? Na kontaktoni për të filluar bashkëpunimin.
          </p>
          <a
            href="mailto:m98construction@yahoo.com"
            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-700"
          >
            Na Kontaktoni 
          </a>
          <p className="mt-4 text-lg">
            Telefon: +355 69 820 7777
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
