// src/pages/Cuenta.jsx
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";

import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function Cuenta() {
  const { user } = useUserContext();
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!user?.email) return;
      const q = query(collection(db, "sales"), where("user.email", "==", user.email));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPurchases(data);
    };

    fetchPurchases();
  }, [user]);

  return (
    <section className="max-w-4xl mx-auto px-4 md:px-8 py-8">
      <h1 className="text-2xl font-semibold mb-4">Mi Cuenta</h1>

      <div className="mb-6 bg-white p-4 rounded shadow">
        <p><strong>Nombre:</strong> {user?.name || "Sin nombre"}</p>
        
        <p><strong>Correo:</strong> {user?.email}</p>
      </div>

      <h2 className="text-xl font-semibold mb-3">Historial de compras</h2>

      {purchases.length === 0 ? (
        <p>No se encontraron compras.</p>
      ) : (
        purchases.map((purchase) => (
          <div
            key={purchase.id}
            className="bg-gray-50 p-4 rounded shadow mb-4 border border-gray-200"
          >
            <p className="text-sm text-gray-600">
              <strong>Fecha:</strong>{" "}
              {new Date(purchase.date.seconds * 1000).toLocaleString()}
            </p>
            <p><strong>Boleta:</strong> {purchase.receiptId}</p>
            <p><strong>Total:</strong> S/ {purchase.total.toFixed(2)}</p>
            <p className="mt-2 font-medium">Productos:</p>
            <ul className="list-disc pl-5">
              {purchase.items.map((item, idx) => (
                <li key={idx}>
                  {item.name} - x{item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </section>
  );
}
