import React, { useState, useContext } from 'react';
import { UserContext } from './UsersContext';
import CreateUserModal from './CreateUserModal';
import { FaPlus } from 'react-icons/fa6';

const Users: React.FC = () => {
  const { users, fetchUsers } = useContext(UserContext) || {
    users: [],
    fetchUsers: () => {},
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = async () => {
    await fetchUsers(); // Refresh list after adding
    closeModal();
  };

  if (!users.length) {
    return <p className="text-center text-gray-500">Loading users...</p>;
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800">Users</h2>

      {/* Botão para abrir o modal de criação de usuário */}
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
                Name
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                User Type
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider">
                Email
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50 transition-colors duration-300"
              >
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                  {user.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                  {user.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                  {renderUserType(user.userType)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                  {user.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                  {user.email}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de criação de usuário */}
      <CreateUserModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
      />
    </div>
  );
};

const renderUserType = (userType: string) => {
  const typeColors: Record<string, string> = {
    ADMIN: 'bg-red-500',
    GUEST: 'bg-blue-500',
    OWNER: 'bg-green-500',
    CLEANER: 'bg-yellow-500',
    LAUNDRY: 'bg-purple-500',
  };

  return (
    <span className={`text-white px-2 py-1 rounded ${typeColors[userType]}`}>
      {userType}
    </span>
  );
};

export default Users;
