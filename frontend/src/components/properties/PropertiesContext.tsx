import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface Owner {
  name: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  birthDate: string;
  cpf: string;
  phone: string;
  email: string;
}

export interface Property {
  id: number;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
  owner: Owner;
  numberOfRooms: number;
  area: number;
  numberOfBathrooms: number;
  fullKitchen: boolean;
  description: string;
  maxGuests: number;
  longitude: number;
  latitude: number;
  minimumStay: number;
}

interface PropertiesContextType {
  properties: Property[];
  loading: boolean;
  error: string | null;
  fetchProperties: () => void;
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(
  undefined
);

export const PropertiesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/v1/properties');
      setProperties(response.data);
    } catch (err) {
      setError('Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get('/api/v1/properties')
      .then((response) => {
        setProperties(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch properties');
        console.log(err);
        setLoading(false);
      });
  }, []);

  return (
    <PropertiesContext.Provider
      value={{ properties, loading, error, fetchProperties }}
    >
      {children}
    </PropertiesContext.Provider>
  );
};

export const useProperties = (): PropertiesContextType => {
  const context = useContext(PropertiesContext);
  if (!context) {
    throw new Error('useProperties must be used within a PropertiesProvider');
  }
  return context;
};
