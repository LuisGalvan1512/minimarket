import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  // _query, _orderBy, _limit
} from "firebase/firestore";

import { db } from "../../firebase/firebase";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { toast } from "react-toastify";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "", category: "", image: "" });

  // Estadísticas
  const [topProducts, setTopProducts] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [dailyReceipts, setDailyReceipts] = useState(0);

  // Cargar productos en tiempo real
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(data);
    });

    return () => unsubscribe();
  }, []);

  // Cargar métricas
  useEffect(() => {
    const loadStats = async () => {
      const salesSnapshot = await getDocs(collection(db, "sales"));
      let total = 0;
      let count = 0;
      const productMap = {};

      salesSnapshot.docs.forEach((doc) => {
        const { total: saleTotal, date, items } = doc.data();
        const saleDate = new Date(date).toDateString();
        const today = new Date().toDateString();

        if (saleDate === today) {
          count++;
        }

        total += saleTotal;

        items.forEach((item) => {
          if (!productMap[item.name]) productMap[item.name] = 0;
          productMap[item.name] += item.quantity;
        });
      });

      const top = Object.entries(productMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, value]) => ({ name, value }));

      setTotalSales(total);
      setDailyReceipts(count);
      setTopProducts(top);
    };

    loadStats();
  }, []);

  // Crear producto
  const handleAddProduct = async () => {
    try {
      const { name, price, stock, category, image } = newProduct;
      if (!name || !price || !stock || !category || !image) {
        toast.error("Completa todos los campos");
        return;
      }

      await addDoc(collection(db, "products"), {
        name,
        price: parseFloat(price),
        stock: parseInt(stock),
        category,
        image
      });

      toast.success("Producto agregado");
      setNewProduct({ name: "", price: "", stock: "", category: "", image: "" });
    } catch {
      toast.error("Error al agregar producto");
    }
  };

  // Editar producto
  const handleEditProduct = async (id, updated) => {
    try {
      const ref = doc(db, "products", id);
      await updateDoc(ref, updated);
      toast.success("Producto actualizado");
    } catch {
      toast.error("Error al actualizar producto");
    }
  };

  // Eliminar producto
  const handleDeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      toast.success("Producto eliminado");
    } catch {
  toast.error("Error al eliminar producto");
}
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-10">
  {/* Panel de estadísticas */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {/* Card 1 */}
    <div className="bg-white shadow p-6 rounded-xl text-center">
      <h3 className="text-gray-500 text-sm">Ventas Totales</h3>
      <p className="text-2xl font-bold text-green-600">
        S/ {totalSales.toFixed(2)}
      </p>
    </div>
    {/* Card 2 
         <div className="bg-white shadow p-6 rounded-xl text-center">
      <h3 className="text-gray-500 text-sm">Boletas de Hoy</h3>
      <p className="text-2xl font-bold text-blue-600">{dailyReceipts}</p>
    </div>
    */}


    {/* Card 3 */}
    <div className="bg-white shadow p-6 rounded-xl">
      <h3 className="text-gray-500 text-sm mb-2">Top Productos</h3>
      <ResponsiveContainer width="100%" height={150}>
        <PieChart>
          <Pie
            data={topProducts}
            dataKey="value"
            nameKey="name"
            outerRadius={60}
            fill="#8884d8"
            label
          >
            {topProducts.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"][
                    index
                  ]
                }
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* Formulario de nuevo producto */}
  <div className="bg-white p-6 shadow rounded-xl">
    <h2 className="text-xl font-semibold mb-4">Agregar Producto</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {["name", "price", "stock", "category", "image"].map((field) => (
        <input
          key={field}
          className="border px-3 py-2 rounded w-full"
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={newProduct[field]}
          onChange={(e) =>
            setNewProduct({ ...newProduct, [field]: e.target.value })
          }
        />
      ))}
      <button
        onClick={handleAddProduct}
        className="bg-green-600 text-white px-4 py-2 rounded w-full md:w-auto hover:bg-green-700 transition col-span-1 md:col-span-1 lg:col-span-1"
      >
        Agregar
      </button>
    </div>
  </div>

  {/* Tabla de productos */}
  <div className="bg-white p-6 shadow rounded-xl overflow-x-auto">
    <h2 className="text-xl font-semibold mb-4">Lista de Productos</h2>
    <table className="w-full table-auto border-collapse min-w-[600px]">
      <thead>
        <tr className="bg-gray-100 text-sm">
          <th className="border p-2 text-left">Nombre</th>
          <th className="border p-2 text-left">Precio</th>
          <th className="border p-2 text-left">Stock</th>
          <th className="border p-2 text-left">Categoría</th>
          <th className="border p-2 text-center">Imagen</th>
          <th className="border p-2 text-center">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((prod) => (
          <tr key={prod.id} className="text-sm">
            <td className="border p-2">
              <input
                className="w-full"
                defaultValue={prod.name}
                onBlur={(e) =>
                  handleEditProduct(prod.id, {
                    ...prod,
                    name: e.target.value,
                  })
                }
              />
            </td>
            <td className="border p-2">
              <input
                className="w-full"
                type="number"
                defaultValue={prod.price}
                onBlur={(e) =>
                  handleEditProduct(prod.id, {
                    ...prod,
                    price: parseFloat(e.target.value),
                  })
                }
              />
            </td>
            <td className="border p-2">
              <input
                className="w-full"
                type="number"
                defaultValue={prod.stock}
                onBlur={(e) =>
                  handleEditProduct(prod.id, {
                    ...prod,
                    stock: parseInt(e.target.value),
                  })
                }
              />
            </td>
            <td className="border p-2">
              <input
                className="w-full"
                defaultValue={prod.category}
                onBlur={(e) =>
                  handleEditProduct(prod.id, {
                    ...prod,
                    category: e.target.value,
                  })
                }
              />
            </td>
            <td className="border p-2 text-center">
              <img
                src={prod.image}
                alt={prod.name}
                className="h-10 mx-auto object-cover"
              />
            </td>
            <td className="border p-2 text-center">
              <button
                onClick={() => handleDeleteProduct(prod.id)}
                className="text-red-600 hover:underline"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
};

export default Admin;
