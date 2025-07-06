import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Tienda from "./pages/Tienda";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Cuenta from "./pages/Cuenta";
import Devoluciones from "./pages/Devoluciones";
import Admin from "./pages/Admin/Admin";
import NotFound from "./pages/NotFound";

import PrivateRoute from "./components/routes/PrivateRoute";
import AdminRoute from "./components/routes/AdminRoute";

// ✅ Importa el CartProvider
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <>
      {/* ✅ Envolver todo con el CartProvider */}
      <CartProvider>
        <Router>
          <Navbar />
          <main className="min-h-screen max-w-7xl mx-auto px-4 md:px-8 py-6">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tienda" element={<Tienda />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />

              <Route
                path="/cuenta"
                element={
                  <PrivateRoute>
                    <Cuenta />
                  </PrivateRoute>
                }
              />

              <Route
                path="/devoluciones"
                element={
                  <PrivateRoute>
                    <Devoluciones />
                  </PrivateRoute>
                }
              />

              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <Admin />
                  </AdminRoute>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </Router>
        <ToastContainer />
      </CartProvider>
    </>
  );
}

export default App;
