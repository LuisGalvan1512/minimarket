import { useCartContext } from "../context/CartContext";
import { useUserContext } from "../context/UserContext";
import { FaTrash } from "react-icons/fa";
import { db } from "../firebase/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

export default function Carrito() {
  const {
    cart,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice
  } = useCartContext();

  const { user, userData } = useUserContext();
  const navigate = useNavigate();

  const finalizarCompra = async () => {
    if (cart.length === 0) return;

    try {
      const receiptId = uuidv4();
      const date = Timestamp.now();

      const userInfo = user
        ? {
            uid: user.uid,
            email: user.email,
            name: userData?.name || "Cliente",
            role: userData?.role || "cliente",
          }
        : {
            uid: "invitado",
            email: "invitado@guest.com",
            name: "Invitado",
            role: "invitado",
          };

      const venta = {
        receiptId,
        date,
        user: userInfo,
        total: totalPrice,
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image || "", // opcional: útil para mostrar en historial
        })),
      };

      await addDoc(collection(db, "sales"), venta);
      clearCart();

      // Redirige a la página de cuenta para ver el historial de compras
      navigate("/cuenta");
    } catch (error) {
      console.error("Error al registrar la venta:", error);
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center">
        Tu carrito de compras
      </h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-500">
          Tu carrito está vacío.{" "}
          <a href="/tienda" className="text-primary underline">Ir a la tienda</a>
        </p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white rounded-lg p-4 shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold text-primary">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
                  <p className="text-sm text-gray-500">Precio: S/ {item.price}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 transition"
                title="Eliminar"
              >
                <FaTrash />
              </button>
            </div>
          ))}

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 border-t pt-6">
            <div className="text-gray-700">
              <p>Total de productos: <strong>{totalItems}</strong></p>
              <p>Total a pagar: <strong>S/ {totalPrice.toFixed(2)}</strong></p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={clearCart}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                Vaciar carrito
              </button>
              <button
                onClick={finalizarCompra}
                className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Finalizar compra
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
