# 🛒 MiniMarket 

Sistema completo de tienda virtual desarrollado con React y Firebase, simulando la experiencia de un minimarket físico. Incluye carrito de compras, roles de usuario, generación de boletas, devoluciones y panel administrativo con métricas visuales.

## ⚙️ Tecnologías principales

- **React + Vite** – SPA rápida y moderna
- **Firebase** – Autenticación y base de datos en tiempo real (Firestore)
- **TailwindCSS** – Estilos responsivos y modernos
- **Context API** – Manejo global de usuario y carrito
- **React Router DOM** – Navegación por rutas
- **Recharts** – Gráficas para panel administrativo
- **React Icons** – Íconos de interfaz

## 📦 Instalación y ejecución

# 1. Clonar el repositorio
git clone https://github.com/LuisGalvan1512/minimarket

cd minimarket

# 2. Requisitos previos:
Tener instalado Node.js (v16 o superior)

- **Instalar dependencias**
npm install

# 3. Ejecutar en modo desarrollo
npm run dev

## 🧩 Funcionalidades clave

- **🔐 Autenticación**: Registro e inicio de sesión con Firebase Auth
- **👥 Roles de usuario**: 
  - Invitado (solo navegación)
  - Cliente (compra, historial, devoluciones)
  - Admin (gestión completa)
- **🛒 Carrito funcional**:
  - Cantidad editable
  - Total dinámico
  - Persistencia entre sesiones
- **🧾 Boletas**:
  - Generación automática
  - Historial guardado en Firestore
- **📊 Panel Admin**:
  - Productos más vendidos
  - Boletas del día
  - Gráfica de ventas
  - Gestión de devoluciones con control de stock

## 🌐 Rutas principales

| Ruta           | Función                                                                 |
|----------------|-------------------------------------------------------------------------|
| `/`            | Inicio con banner promocional, categorías y ofertas                    |
| `/tienda`      | Visualización de productos filtrados por categoría                      |
| `/carrito`     | Resumen de compra y botón para finalizar pago                           |
| `/cuenta`      | Perfil del usuario e historial de boletas                               |
| `/devoluciones`| Lista de compras elegibles para devolución                              |
| `/admin`       | Panel de métricas y gestión completa (requiere rol admin)               |

## 👥 Flujo de usuario

### 👋 Visitante
- Navegar por catálogo de productos
- Agregar items al carrito
- Registrarse para finalizar compra

### 🛒 Cliente registrado
- Iniciar sesión con credenciales
- Completar compra (genera boleta automática)
- Ver historial de compras anteriores
- Solicitar devoluciones de productos

### 🔑 Administrador
- Acceso exclusivo a `/admin`
- CRUD completo de productos
- Visualización de métricas en tiempo real
- Aprobación/rechazo de devoluciones
- Control de inventario automático
