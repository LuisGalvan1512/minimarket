import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useCartContext } from "../context/CartContext";

import { useUserContext } from "../context/UserContext";


export default function Navbar() {
  const { totalItems } = useCartContext();
  const { user, userData, logout } = useUserContext(); // Se añadió userData
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    closeMenu();
  };

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-secondary font-semibold transition-colors duration-300"
      : "text-gray-700 hover:text-primary transition-colors duration-300";

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary" onClick={closeMenu}>
          MiniMarket
        </Link>

        {/* Botón móvil */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl text-gray-700 focus:outline-none">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Enlaces */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent md:flex items-center gap-6 text-sm md:text-base px-6 md:px-0 py-4 md:py-0 border-t md:border-none z-40`}
        >
          <NavLink to="/" className={navLinkClass} onClick={closeMenu}>
            Inicio
          </NavLink>

          <NavLink to="/tienda" className={navLinkClass} onClick={closeMenu}>
            Tienda
          </NavLink>

          {user ? (
            <>
              <NavLink to="/cuenta" className={navLinkClass} onClick={closeMenu}>
                Mi Cuenta
              </NavLink>



              {/* Mostrar botón Admin solo si el usuario es admin */}
              {userData?.role === "admin" && (
                <NavLink to="/admin" className={navLinkClass} onClick={closeMenu}>
                  Admin
                </NavLink>
              )}

              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600 transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass} onClick={closeMenu}>
                Ingresar
              </NavLink>
              <NavLink to="/registro" className={navLinkClass} onClick={closeMenu}>
                Registrarse
              </NavLink>
            </>
          )}

          {/* Carrito */}
          <NavLink to="/carrito" className={navLinkClass} onClick={closeMenu}>
            <div className="relative inline-block">
              <FaShoppingCart className="text-xl" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-secondary text-white text-xs px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </div>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
