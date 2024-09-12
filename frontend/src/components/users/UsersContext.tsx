import { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

export interface User {
  id: number;
  name: string;
  userType: string;
  phone: string;
  email: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  birthDate: string;
  cpf: string;
  pix: string;
}

interface UserContextProps {
  users: User[];
  fetchUsers: () => void;
  addUser: (newUser: User) => void;
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/v1/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users', error);
    }
  };

  const addUser = async (newUser: User) => {
    try {
      await axios.post('/api/v1/users', newUser);
      fetchUsers(); // Refresh list after adding
    } catch (error) {
      console.error('Error adding user', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, fetchUsers, addUser }}>
      {children}
    </UserContext.Provider>
  );
};
