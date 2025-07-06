import { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useUserContext } from "../context/UserContext";

const Devoluciones = () => {
  const { user } = useUserContext() || {};
  const [boletas, setBoletas] = useState([]);
  const [mensaje, setMensaje] = useState("");

  // Obtener boletas del usuario autenticado
  useEffect(() => {
    const obtenerBoletas = async () => {
      if (!user || !user.uid) return;

      try {
        const q = query(collection(db, "sales"), where("user", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const resultados = [];

        querySnapshot.forEach((doc) => {
          resultados.push({ id: doc.id, ...doc.data() });
        });

        setBoletas(resultados);
      } catch (error) {
        console.error("Error al obtener boletas:", error);
      }
    };

    obtenerBoletas();
  }, [user]);

  // Función para devolver una boleta completa
  const handleDevolverBoleta = async (boleta) => {
    try {
      // 1. Aumentar el stock por cada producto
      for (const item of boleta.items) {
        const productoRef = doc(db, "products", item.id);
        const productoSnap = await getDoc(productoRef);

        if (productoSnap.exists()) {
          const stockActual = productoSnap.data().stock || 0;
          await updateDoc(productoRef, {
            stock: stockActual + item.quantity,
          });
        }
      }

      // 2. Registrar devolución (opcional)
      await addDoc(collection(db, "devoluciones"), {
        user: user.uid,
        boletaId: boleta.id,
        fecha: new Date(),
        totalDevuelto: boleta.total,
        items: boleta.items,
      });

      // 3. Eliminar la boleta
      await deleteDoc(doc(db, "sales", boleta.id));

      // 4. Actualizar vista
      setBoletas((prev) => prev.filter((b) => b.id !== boleta.id));
      setMensaje("✅ Boleta devuelta correctamente y stock actualizado.");
    } catch (error) {
      console.error("Error al devolver boleta:", error);
      setMensaje("❌ Hubo un error al procesar la devolución.");
    }
  };

  if (!user) return <p className="text-center mt-10">Cargando usuario...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Tus boletas y devoluciones</h1>

      {mensaje && <p className="text-center font-semibold mb-4">{mensaje}</p>}

      {boletas.length === 0 ? (
        <p className="text-center text-gray-600">No tienes boletas registradas.</p>
      ) : (
        <div className="space-y-6">
          {boletas.map((boleta) => (
            <div key={boleta.id} className="border p-4 rounded shadow-sm">
              <p className="font-semibold">ID: {boleta.receiptId}</p>
              <p>Total: S/ {boleta.total.toFixed(2)}</p>
              <p>Fecha: {new Date(boleta.date.seconds * 1000).toLocaleString()}</p>
              <ul className="mt-2 text-sm text-gray-700">
                {boleta.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} (x{item.quantity}) - S/ {item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleDevolverBoleta(boleta)}
                className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Devolver boleta
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Devoluciones;
