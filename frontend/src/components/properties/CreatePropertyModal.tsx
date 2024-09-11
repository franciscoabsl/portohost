import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react';
import { FaTimes } from 'react-icons/fa';

interface Owner {
  id: number;
  name: string;
}

interface CreatePropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

const CreatePropertyModal: React.FC<CreatePropertyModalProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [selectedOwner, setSelectedOwner] = useState<number | null>(null);
  const [propertyData, setPropertyData] = useState({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    numberOfRooms: 0,
    area: 0,
    numberOfBathrooms: 0,
    fullKitchen: false,
    description: '',
    maxGuests: 0,
    longitude: 0,
    latitude: 0,
    minimumStay: 0,
  });

  useEffect(() => {
    // Fetch the owners (users with role OWNER)
    const fetchOwners = async () => {
      try {
        const response = await axios.get('/api/v1/users');
        const ownersData = response.data.filter(
          (user: any) => user.userType === 'OWNER'
        );
        setOwners(ownersData);
      } catch (error) {
        console.error('Failed to fetch owners:', error);
      }
    };

    if (isOpen) {
      fetchOwners();
    }
  }, [isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value === 'yes',
    }));
  };

  const handleSave = async () => {
    if (!selectedOwner) {
      alert('Please select an owner');
      return;
    }

    const dataToSend = {
      ...propertyData,
      owner: {
        id: selectedOwner,
      },
    };

    try {
      await axios.post('/api/v1/properties', dataToSend);
      onSave(); // Call the onSave callback to refresh properties list
      onClose(); // Close the modal
    } catch (error) {
      console.error('Failed to create property:', error);
    }
  };

  return (
    <Transition show={isOpen} as={React.Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClose={onClose}
      >
        <div className="fixed inset-0 bg-black opacity-50" aria-hidden="true" />
        <div className="relative bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 z-10 overflow-y-auto max-h-[90vh]">
          <Dialog.Title className="text-2xl font-semibold mb-4">
            Create New Property
          </Dialog.Title>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Street
                </label>
                <input
                  type="text"
                  name="street"
                  value={propertyData.street}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Number
                </label>
                <input
                  type="text"
                  name="number"
                  value={propertyData.number}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Complement
                </label>
                <input
                  type="text"
                  name="complement"
                  value={propertyData.complement}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Neighborhood
                </label>
                <input
                  type="text"
                  name="neighborhood"
                  value={propertyData.neighborhood}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={propertyData.city}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={propertyData.state}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Zip Code
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={propertyData.zipCode}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Number of Rooms
                </label>
                <input
                  type="number"
                  name="numberOfRooms"
                  value={propertyData.numberOfRooms}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Area
                </label>
                <input
                  type="number"
                  name="area"
                  value={propertyData.area}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Number of Bathrooms
                </label>
                <input
                  type="number"
                  name="numberOfBathrooms"
                  value={propertyData.numberOfBathrooms}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Max Guests
                </label>
                <input
                  type="number"
                  name="maxGuests"
                  value={propertyData.maxGuests}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Minimum Stay
                </label>
                <input
                  type="number"
                  name="minimumStay"
                  value={propertyData.minimumStay}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Longitude
                </label>
                <input
                  type="number"
                  name="longitude"
                  value={propertyData.longitude}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Latitude
                </label>
                <input
                  type="number"
                  name="latitude"
                  value={propertyData.latitude}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Full Kitchen
                </label>
                <div className="flex items-center">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="fullKitchen"
                      value="yes"
                      checked={propertyData.fullKitchen === true}
                      onChange={handleRadioChange}
                      className="form-radio"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="inline-flex items-center ml-4">
                    <input
                      type="radio"
                      name="fullKitchen"
                      value="no"
                      checked={propertyData.fullKitchen === false}
                      onChange={handleRadioChange}
                      className="form-radio"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={propertyData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  rows={4}
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Owner
                </label>
                <select
                  name="owner"
                  value={selectedOwner || ''}
                  onChange={(e) => setSelectedOwner(Number(e.target.value))}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                >
                  <option value="">Select an owner</option>
                  {owners.map((owner) => (
                    <option key={owner.id} value={owner.id}>
                      {owner.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save
              </button>
            </div>
          </form>

          <button
            type="button"
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreatePropertyModal;
