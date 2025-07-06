// src/pages/Tienda.jsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useCartContext } from "../context/CartContext";


export default function Tienda() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("todas");
  const [search, setSearch] = useState("");

  const { addToCart } = useCartContext();

  useEffect(() => {
    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
      setFiltered(items);

      const uniqueCategories = [
        ...new Set(items.map((item) => item.category.toLowerCase())),
      ];
      setCategories(uniqueCategories);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let result = products;

    if (selectedCategory !== "todas") {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory
      );
    }

    if (search.trim() !== "") {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(result);
  }, [selectedCategory, search, products]);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Tienda</h1>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <select
          className="border px-3 py-2 rounded-md text-sm"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="todas">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat[0].toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Buscar por nombre..."
          className="border px-3 py-2 rounded-md text-sm w-full sm:w-auto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.length === 0 ? (
          <p className="text-gray-500">No se encontraron productos.</p>
        ) : (
          filtered.map((product) => (
            <div
              key={product.id}
              className="flex flex-col justify-between border rounded-md p-4 shadow hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover mb-2 rounded"
              />
              <div className="flex-grow">
                <h2 className="font-semibold text-lg">{product.name}</h2>
                <p className="text-sm text-gray-500 capitalize">
                  {product.category}
                </p>
                <p className="mt-1 font-bold text-primary">S/ {product.price}</p>
              </div>
              <button
                onClick={() => addToCart(product)}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded transition"
              >
                Agregar al carrito
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
