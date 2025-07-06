import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase"; 
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom"; // ✅ PASO 1

export default function CategoriasDestacadas() {
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate(); // ✅ PASO 2

  useEffect(() => {
    AOS.init();
    const obtenerCategorias = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const categoriasSet = new Set();
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.category) {
          categoriasSet.add(data.category);
        }
      });
      setCategorias([...categoriasSet]);
    };
    obtenerCategorias();
  }, []);

  const handleClick = (categoria) => {
    navigate(`/tienda?categoria=${encodeURIComponent(categoria)}`); // ✅ PASO 3
  };

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2
          className="text-2xl font-bold text-primary mb-6 text-center"
          data-aos="fade-up"
        >
          Categorías destacadas
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categorias.map((categoria, idx) => (
            <div
              key={idx}
              className="bg-neutral p-4 rounded-xl shadow hover:shadow-md text-center cursor-pointer transition"
              data-aos="zoom-in"
              onClick={() => handleClick(categoria)} // ✅ NAVEGACIÓN
            >
              <div className="text-4xl mb-2">🛒</div>
              <p className="text-lg font-semibold text-gray-700">
                {categoria}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
