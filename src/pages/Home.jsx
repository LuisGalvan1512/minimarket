import CategoriasDestacadas from "../components/CategoriasDestacadas";
import { FaShoppingCart, FaTruck, FaLock, FaClock } from "react-icons/fa";

export default function Home() {
  return (
    <>
      {/* Banner principal */}
      <section className="relative min-h-[85vh] flex items-center justify-center px-4 bg-gradient-to-r from-blue-100 to-blue-50">
        <div className="absolute inset-0 bg-[url('/banner-minimarket.jpg')] bg-cover bg-center opacity-10 pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl text-center" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
            Bienvenido al <span className="text-secondary">MiniMarket</span>
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Encuentra tus productos favoritos con <strong>ofertas exclusivas</strong> y una experiencia rápida y segura.
          </p>
          <a
            href="/tienda"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-700 transition shadow-md"
          >
            <FaShoppingCart /> Ir a la tienda
          </a>
        </div>
      </section>

      {/* Beneficios destacados */}
      <section className="bg-white py-6 border-t border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 text-center text-gray-700">
 
          <div className="flex flex-col items-center gap-2" data-aos="fade-up" data-aos-delay="100">
            <FaLock className="text-3xl text-primary" />
            <p>Pagos 100% seguros</p>
          </div>
          <div className="flex flex-col items-center gap-2" data-aos="fade-up" data-aos-delay="200">
            <FaClock className="text-3xl text-primary" />
            <p>Atención inmediata</p>
          </div>
          <div className="flex flex-col items-center gap-2" data-aos="fade-up" data-aos-delay="300">
            <FaShoppingCart className="text-3xl text-primary" />
            <p>+100 productos disponibles</p>
          </div>
        </div>
      </section>

      {/* Categorías */}
      <CategoriasDestacadas />
    </>
  );
}
