import {
  FaCalendarDays,
  FaChartColumn,
  FaHouse,
  FaMoneyBillTransfer,
  FaUser,
} from 'react-icons/fa6';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-gray-700' : '';
  };

  return (
    <div className="fixed top-0 left-0 w-64 h-screen bg-gray-800 text-white overflow-y-auto">
      <h2 className="text-2xl font-bold text-center py-4 border-b border-gray-700">
        Porto Hosts
      </h2>
      <ul className="mt-6 space-y-2">
        <li className={`hover:bg-gray-700 transition-all ${isActive('/')}`}>
          <Link to="/" className="py-3 px-6 flex items-center">
            <FaChartColumn className="mr-2" />
            Dashboard
          </Link>
        </li>
        <li
          className={`hover:bg-gray-700 transition-all ${isActive('/users')}`}
        >
          <Link to="/users" className="flex py-3 px-6 items-center">
            <FaUser className="mr-2" />
            Users
          </Link>
        </li>
        <li
          className={`hover:bg-gray-700 transition-all ${isActive(
            '/properties'
          )}`}
        >
          <Link to="/properties" className="flex items-center py-3 px-6">
            <FaHouse className="mr-2" />
            Properties
          </Link>
        </li>
        <li
          className={`hover:bg-gray-700 transition-all ${isActive(
            '/bookings'
          )}`}
        >
          <Link to="/bookings" className="flex py-3 px-6 items-center">
            <FaCalendarDays className="mr-2" />
            Bookings
          </Link>
        </li>
        <li
          className={`hover:bg-gray-700 transition-all ${isActive(
            '/transactions'
          )}`}
        >
          <Link to="/transactions" className="flex py-3 px-6 items-center">
            <FaMoneyBillTransfer className="mr-2" />
            Transactions
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
