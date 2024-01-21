import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-5 bg-blue-500 text-white">
      <h1>customer_system</h1>
      <nav>
        <Link to="/clientes" className="mr-4">Clientes</Link>
        <Link to="/pedidos">Pedidos</Link>
      </nav>
    </header>
  );
}

export default Header;