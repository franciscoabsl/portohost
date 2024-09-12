import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { Property } from './PropertiesContext';
import {
  FaBed,
  FaAddressCard,
  FaBath,
  FaLocationDot,
  FaKitchenSet,
  FaPhone,
  FaEnvelope,
  FaAlignJustify,
  FaPersonCirclePlus,
  FaCalendarDay,
  FaArrowsUpDownLeftRight,
  FaPen,
  FaCircleUser,
} from 'react-icons/fa6';
import EditPropertyModal from './EditPropertyModal';

const PropertyDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`/api/v1/properties/${id}`);
        setProperty(response.data);
      } catch (error) {
        console.error('Error fetching property details:', error);
      }
    };

    fetchProperty();
  }, [id]);

  const handleEditClick = () => {
    setShowModal(true);
  };

  const handleSave = (updatedProperty: Property) => {
    setProperty(updatedProperty);
    setShowModal(false);
    // Call API to update property
    axios
      .put(`/api/v1/properties/${updatedProperty.id}`, updatedProperty)
      .then((response) => {
        console.log('Property updated:', response.data);
      })
      .catch((error) => {
        console.error('Error updating property:', error);
      });
  };

  if (!property) return <div>Loading...</div>;

  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  const center = {
    lat: property.latitude,
    lng: property.longitude,
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <button
        onClick={handleEditClick}
        className="top-4 right-4 fixed text-white bg-blue-500 hover:bg-blue-600 px-2 py-2 rounded-full"
      >
        <FaPen />
      </button>
      {property && (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            {/* General Information Section */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">
                General Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaBed className="mr-2" />
                  <strong className="mr-1">Number of Rooms:</strong>{' '}
                  {property.numberOfRooms}
                </div>
                <div className="flex items-center">
                  <FaKitchenSet className="mr-2" />
                  <strong className="mr-1">Full Kitchen:</strong>{' '}
                  {property.fullKitchen ? 'Yes' : 'No'}
                </div>
                <div className="flex items-center">
                  <FaBath className="mr-2" />
                  <strong className="mr-1">Number of Bathrooms:</strong>{' '}
                  {property.numberOfBathrooms}
                </div>
                <div className="flex items-center">
                  <FaArrowsUpDownLeftRight className="mr-2" />
                  <strong className="mr-1">Area:</strong> {property.area} sq ft
                </div>
                <div className="flex items-center">
                  <FaAlignJustify className="mr-2" />
                  <strong className="mr-1">Description:</strong>
                  {property.description}
                </div>
                <div className="flex items-center">
                  <FaPersonCirclePlus className="mr-2" />
                  <strong className="mr-1">Max Guests:</strong>{' '}
                  {property.maxGuests}
                </div>
                <div className="flex items-center">
                  <FaCalendarDay className="mr-2" />
                  <strong className="mr-1">Minimum Stay:</strong>{' '}
                  {property.minimumStay} nights
                </div>
              </div>
            </div>

            {/* Owner Information Section */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Owner Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaCircleUser className="mr-2" />
                  <strong className="mr-1">Name:</strong> {property.owner.name}
                </div>
                <div className="flex items-center">
                  <FaLocationDot className="mr-2" />
                  <strong className="mr-1">Address:</strong>
                  {property.owner.street}, {property.owner.number},{' '}
                  {property.owner.complement}, {property.owner.neighborhood},{' '}
                  {property.owner.city}
                </div>
                <div className="flex items-center">
                  <FaPhone className="mr-2" />
                  <strong className="mr-1">Phone: </strong>{' '}
                  {property.owner.phone}
                </div>
                <div className="flex items-center">
                  <FaEnvelope className="mr-2" />
                  <strong className="mr-1">Email: </strong>{' '}
                  {property.owner.email}
                </div>
                <div className="flex items-center">
                  <FaAddressCard className="mr-2" />
                  <strong className="mr-1">CPF: </strong> {property.owner.cpf}
                </div>
              </div>
            </div>

            {/* Address Section with Map */}
            <div className="bg-white shadow-lg rounded-lg p-6 md:col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Property Address</h2>
                  <div>
                    <strong className="mr-1">Street:</strong> {property.street}
                  </div>
                  <div>
                    <strong className="mr-1">Number:</strong>
                    {property.number}
                  </div>
                  <div>
                    <strong className="mr-1">Complement:</strong>
                    {property.complement}
                  </div>
                  <div>
                    <strong className="mr-1">Neighborhood:</strong>
                    {property.neighborhood}
                  </div>
                  <div>
                    <strong className="mr-1">City:</strong>
                    {property.city}
                  </div>
                  <div>
                    <strong className="mr-1">State:</strong>
                    {property.state}
                  </div>
                  <div>
                    <strong className="mr-1">ZIP Code:</strong>
                    {property.zipCode}
                  </div>
                </div>

                <div className="h-80">
                  {' '}
                  {/* Adjust height as needed */}
                  <LoadScript
                    googleMapsApiKey={
                      process.env.REACT_APP_GOOGLE_MAPS_API_KEY!
                    }
                  >
                    <GoogleMap
                      mapContainerStyle={containerStyle}
                      center={center}
                      zoom={15}
                    >
                      <Marker position={center} />
                    </GoogleMap>
                  </LoadScript>
                </div>
              </div>
            </div>
          </div>
          <EditPropertyModal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            property={property}
            onSave={handleSave}
          />
        </>
      )}
    </div>
  );
};

export default PropertyDetails;
