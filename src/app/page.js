import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { CiSearch } from 'react-icons/ci';


export default function Main() {
  return (
    <div className="bg-[#4A503D] text-white min-h-screen font-serif">
      {/* Navbar */}
      <Navbar/>

      {/* Hero Section */}
      <div
        className="relative w-full h-[500px] bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('../cover-restaurant-image.jpg')" }}
      >
        <div className="absolute inset-0  bg-opacity-40 flex flex-col items-center justify-center">
          <h1 className="text-5xl font-bold">RESTAURANTS</h1>
          <p className="mt-2">Find your next meal. Book the right place in time.</p>
          <div className="search-bar flex items-center relative  justify-center">
            <input
              type="text"
              placeholder="Search restaurant or meal"
              className="mt-4 px-4 py-2 rounded-3xl w-80 text-white border-1 border-white  "
            />
            <button
              id="search-button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 mt-2"
            >
              <CiSearch size={20} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex justify-center gap-4 bg-[#CDC1A5] py-4">
        {['Steak', 'Pasta', 'Bosnian Cuisine', 'Vegan', 'Asian Cuisine', 'Cafes'].map(
          (category, index) => (
            <button
              key={index}
              className="px-6 py-2 rounded-lg bg-[#4A503D] text-white shadow-lg hover:scale-105 duration-200"
            >
              {category}
            </button>
          )
        )}
      </div>
      <section className="py-12 bg-[#E7DDC4] text-black">
        <h2 className="text-3xl font-bold text-center mb-6">Featured places:</h2>
        <div className="flex justify-center gap-6 px-10">
          {[
            { name: 'Klopa', image: '/zeljo-restaurant.jpg' },
            { name: 'Careva Ćuprija', image: '/careva-cuprija.jpg' },
            { name: 'Čakum Pakum', image: '/cakum-pakum.jpg' },
            { name: 'Apetit Restoran', image: '/apetit-restoran.jpg' },
            { name: 'Kibe Mahala', image: '/kibe-mahala.jpg' },
            { name: 'Željo Ćevabdžinica', image: '/zeljo-restaurant.jpg' },
          ].map((place, i) => (
            <div
              key={i}
              className="bg-white p-4 mb-2 rounded-xl shadow-lg w-48 text-center shadow-lg hover:scale-105 duration-200"
            >
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-32 object-cover rounded-lg"
              />
              <h3 className="mt-2 font-bold">{place.name}</h3>
              <p className="text-sm text-gray-600">Lorem ipsum text here.</p>
              <button className="mt-3 bg-[#4A503D] text-white px-4 py-2 rounded-lg hover:bg-white hover:text-[#4A503D] border-1 border-transparent hover:border-[#4A503D]  duration-200">
                Book now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-10 flex justify-around bg-[#E7DDC4] text-black">
        {[
          {
            text: 'Select your restaurant, pick a date & time, and send your reservation request!',
            image: '/woman-placing-order.png',
          },
          {
            text: 'The restaurant reviews and confirms your booking in real time!',
            image: '/waiter-processing-order.png',
          },
          {
            text: 'Arrive, get seated instantly, and enjoy your meal—no waiting!',
            image: '/people-having-dinner.png',
          },
        ].map((step, i) => (
          <div key={i} className="w-1/3 text-center max-w-70">
            <img src={step.image} alt="Step" className="mx-auto h-40" />
            <p className="mt-3 text-sm">{step.text}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
