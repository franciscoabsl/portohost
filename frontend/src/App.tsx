import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Home from './components/pages/Home';
import Users from './components/pages/Users';
import Properties from './components/properties/Properties';
import Bookings from './components/pages/Bookings';
import Transactions from './components/pages/Transactions';
import './index.css';
import { PropertiesProvider } from './components/properties/PropertiesContext';
import PropertyDetails from './components/properties/PropertyDetails';

const App = () => {
  return (
    <Router>
      <DashboardLayout>
        <PropertiesProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetails />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </PropertiesProvider>
      </DashboardLayout>
    </Router>
  );
};

export default App;
