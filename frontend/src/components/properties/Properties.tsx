import { Link } from 'react-router-dom';
import { useProperties } from './PropertiesContext';
import React, { useState } from 'react';
import CreatePropertyModal from './CreatePropertyModal';
import { FaPlus } from 'react-icons/fa6';

const Properties: React.FC = () => {
  const { properties, loading, error, fetchProperties } = useProperties();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    // Após salvar uma nova propriedade, você pode recarregar as propriedades
    fetchProperties();
    closeModal();
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading properties...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800">Properties</h2>

      {/* Botão para abrir o modal de criação de propriedade */}
      <div className="flex justify-end mb-3">
        <button
          onClick={openModal}
          className="px-2 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full"
        >
          <FaPlus />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-200 text-gray-600">
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Street
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Owner
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                City
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                State
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Zip Code
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {properties.map((property) => (
              <tr
                key={property.id}
                className="hover:bg-gray-50 transition-colors duration-300"
              >
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                  <Link to={`/properties/${property.id}`}>{property.id}</Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                  {`${property.street}, ${property.number}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                  {property.owner.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                  {property.city}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                  {property.state}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                  {property.zipCode}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de criação de propriedade */}
      <CreatePropertyModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
      />
    </div>
  );
};

export default Properties;
