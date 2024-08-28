import React from 'react';
import { Link } from 'react-router-dom';
import BgPhoto from '../assets/BgPhoto.jpg'; // Sigurohu që ky rrugë është i saktë

// Fotot e mostra
const photos = [
  'https://via.placeholder.com/600x400?text=Project+1',
  'https://via.placeholder.com/600x400?text=Project+2',
  'https://via.placeholder.com/600x400?text=Project+3',
];

const Home = () => {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section
        className="text-white text-center py-16"
        style={{
          backgroundImage: `url(${BgPhoto})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="container mx-auto bg-black bg-opacity-50 p-8 rounded-lg">
          <h1 className="text-5xl font-bold mb-4">Mirë se erdhët në M98 Construction</h1>
          <p className="text-lg mb-8">
            Partneri juaj i besueshëm për të gjitha nevojat tuaja në ndërtim. Ne ofrojmë cilësi dhe ekselencë në çdo projekt.
          </p>
          <Link
            to="/projects"
            className="bg-gray-600 text-white font-bold py-2 px-6 rounded-md hover:bg-gray-800"
          >
            Shihni Projektet Tona
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-8">Rreth Nesh</h2>
          <p className="text-lg mb-8">
            M98 Construction ka përvojë në industrinë e ndërtimit që nga viti 1996 dhe është themeluar në vitin 2001. Ne specializohemi në punime gipsi, patinim, lyerje, instalime elektrike dhe hidraulike, shtrim pllakash, parketi, mure tulle, savatime, sisteme kapot dhe grafiato.
          </p>
          <p className="text-lg mb-8">
            Ne ofrojmë menaxhim projektesh dhe rikonstruksione të brendshme dhe të jashtme. Synimi ynë është të bëjmë klientët të lumtur, të sigurojmë cilësi në çdo projekt dhe të përfundojmë punët sa më shpejt. Me përkushtim të lartë dhe përvojë të gjatë, mbulojmë të gjithë Shqipërinë dhe jashtë saj.
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        className="py-16 text-white"
        style={{
          backgroundImage: `url(${BgPhoto})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="container mx-auto px-4 bg-black bg-opacity-50 p-8 rounded-lg">
          <h2 className="text-4xl font-bold text-center mb-8">Puna Jonë</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <div key={index} className="relative">
                <img
                  src={photo}
                  alt={`Projekt ${index + 1}`}
                  className="w-full h-auto rounded-lg shadow-md"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-lg font-bold">Projekt {index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Kontaktoni</h2>
          <p className="text-lg mb-8">
            Keni pyetje apo dëshironi të diskutojmë për projektin tuaj? Na kontaktoni sot për të filluar.
          </p>
          <a
            href="mailto:m98construction@yahoo.com"
            className="bg-gray-700 text-white font-bold py-2 px-6 rounded-md hover:bg-gray-600"
          >
            Na Kontaktoni
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
