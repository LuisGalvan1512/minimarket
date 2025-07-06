import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-white">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <p className="text-lg text-gray-700 mb-6">
        Uy... no encontramos la página que estás buscando.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-primary text-white px-6 py-2 rounded hover:bg-secondary transition"
      >
        <FaArrowLeft />
        Volver al inicio
      </Link>
    </section>
  );
}
