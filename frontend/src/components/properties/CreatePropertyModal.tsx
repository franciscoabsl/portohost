import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, Transition } from '@headlessui/react';
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
        <div className="relative bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 z-10 overflow-y-scroll max-h-[90vh]">
          <DialogTitle className="text-xl font-semibold mb-4">
            Create New Property
          </DialogTitle>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="col-span-3">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="owner"
                >
                  Owner
                </label>
                <select
                  id="owner"
                  name="owner"
                  value={selectedOwner || ''}
                  onChange={(e) => setSelectedOwner(Number(e.target.value))}
                  className="block appearance-none w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5"
                >
                  <option value="">Select an owner</option>
                  {owners.map((owner) => (
                    <option key={owner.id} value={owner.id}>
                      {owner.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-span-2">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="street"
                >
                  Street
                </label>
                <input
                  type="text"
                  name="street"
                  id="street"
                  value={propertyData.street}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="number"
                >
                  Number
                </label>
                <input
                  type="text"
                  id="number"
                  name="number"
                  value={propertyData.number}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              <div className="col-span-2">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="complement"
                >
                  Complement
                </label>
                <input
                  type="text"
                  id="complement"
                  name="complement"
                  value={propertyData.complement}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="neighborhood"
                >
                  Neighborhood
                </label>
                <input
                  id="neighborhood"
                  type="text"
                  name="neighborhood"
                  value={propertyData.neighborhood}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="city"
                >
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  name="city"
                  value={propertyData.city}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="state"
                >
                  State
                </label>
                <input
                  id="state"
                  type="text"
                  name="state"
                  value={propertyData.state}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="zipCode"
                >
                  Zip Code
                </label>
                <input
                  id="zipCode"
                  type="text"
                  name="zipCode"
                  value={propertyData.zipCode}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="latitude"
                >
                  Latitude
                </label>
                <input
                  id="latitude"
                  type="number"
                  name="latitude"
                  value={propertyData.latitude}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="longitude"
                >
                  Longitude
                </label>
                <input
                  id="longitude"
                  type="number"
                  name="longitude"
                  value={propertyData.longitude}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              <div className="col-span-3">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={propertyData.description}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  rows={4}
                />
              </div>

              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="area"
                >
                  Area (m²)
                </label>
                <input
                  id="area"
                  type="number"
                  name="area"
                  value={propertyData.area}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="numberOfRooms"
                >
                  Number of Rooms
                </label>
                <input
                  id="numberOfRooms"
                  type="number"
                  name="numberOfRooms"
                  value={propertyData.numberOfRooms}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="numberOfBathrooms"
                >
                  Number of Bathrooms
                </label>
                <input
                  id="numberOfBathrooms"
                  type="number"
                  name="numberOfBathrooms"
                  value={propertyData.numberOfBathrooms}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="maxGuests"
                >
                  Max Guests
                </label>
                <input
                  id="maxGuests"
                  type="number"
                  name="maxGuests"
                  value={propertyData.maxGuests}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="minimumStay"
                >
                  Minimum Stay
                </label>
                <input
                  id="minimumStay"
                  type="number"
                  name="minimumStay"
                  value={propertyData.minimumStay}
                  onChange={handleInputChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Full Kitchen
                </label>
                <div className="flex items-center">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="fullKitchenYes"
                  >
                    <input
                      type="radio"
                      name="fullKitchen"
                      id="fullKitchenYes"
                      value="yes"
                      checked={propertyData.fullKitchen === true}
                      onChange={handleRadioChange}
                      className="form-radio"
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="fullKitchenYNo"
                  >
                    <input
                      id="fullKitchenYNo"
                      type="radio"
                      name="fullKitchen"
                      value="no"
                      checked={propertyData.fullKitchen === false}
                      onChange={handleRadioChange}
                      className="form-radio ml-2"
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
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
            <FaTimes />
          </button>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreatePropertyModal;
