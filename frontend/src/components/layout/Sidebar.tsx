import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-gray-800 text-white overflow-y-auto">
      <h2 className="text-2xl font-bold text-center py-4 border-b border-gray-700">
        Porto Hosts
      </h2>
      <ul className="mt-6 space-y-2">
        <li className="hover:bg-gray-700 transition-all">
          <Link to="/" className="block py-3 px-6">
            Home
          </Link>
        </li>
        <li className="hover:bg-gray-700 transition-all">
          <Link to="/users" className="block py-3 px-6">
            Users
          </Link>
        </li>
        <li className="hover:bg-gray-700 transition-all">
          <Link to="/properties" className="block py-3 px-6">
            Properties
          </Link>
        </li>
        <li className="hover:bg-gray-700 transition-all">
          <Link to="/bookings" className="block py-3 px-6">
            Bookings
          </Link>
        </li>
        <li className="hover:bg-gray-700 transition-all">
          <Link to="/transactions" className="block py-3 px-6">
            Transactions
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
