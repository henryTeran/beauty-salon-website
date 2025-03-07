import Testimonials from "../components/Testimonials";

export default function Home() {
  return (
    <div>
      {/* Section d'accueil */}
      <section className="relative min-h-screen flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?spa,beauty')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-white p-6">
          <h1 className="text-5xl font-bold text-gold animate-fadeIn">Bienvenue chez Gi-Zo Beauty</h1>
          <p className="mt-4 text-lg">Offrez-vous un moment de bien-être et de relaxation</p>
          <a href="/booking" className="mt-6 inline-block bg-gold text-white px-6 py-3 rounded-full text-lg hover:bg-white hover:text-gold transition duration-300">
            Réserver un soin
          </a>
        </div>
      </section>

      {/* Section Témoignages */}
      <Testimonials />
    </div>
  );
}
