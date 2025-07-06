import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-md transition p-4 flex flex-col">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-lg mb-3"
      />
      <h3 className="text-lg font-semibold text-primary">{product.name}</h3>
      <p className="text-gray-600">{product.category}</p>
      <p className="text-xl font-bold text-secondary mt-2">S/ {product.price}</p>
      <p className="text-sm text-gray-500">Stock: {product.stock}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-auto bg-primary text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
      >
        Agregar al carrito
      </button>
    </div>
  );
}
