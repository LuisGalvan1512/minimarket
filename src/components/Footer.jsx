export default function Footer() {
  return (
    <footer className="bg-gray-100 py-4 text-center border-t border-gray-200 mt-10">
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} MiniMarket. Todos los derechos reservados.
      </p>
    </footer>
  );
}
