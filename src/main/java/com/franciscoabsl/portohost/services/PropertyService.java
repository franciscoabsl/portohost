package com.franciscoabsl.portohost.services;

import com.franciscoabsl.portohost.models.Property;
import com.franciscoabsl.portohost.repositories.PropertyRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public record PropertyService(PropertyRepository propertyRepository) {

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public Property getPropertyById(Long id) {
        return propertyRepository.findById(id).orElseThrow(() -> new RuntimeException("Property not found"));
    }

    public Property createProperty(Property property) {
        return propertyRepository.save(property);
    }

    public Property updateProperty(Long id, Property updatedProperty) {
        return propertyRepository.findById(id)
                .map(property -> {
                    property.setStreet(updatedProperty.getStreet());
                    property.setNumber(updatedProperty.getNumber());
                    property.setComplement(updatedProperty.getComplement());
                    property.setNeighborhood(updatedProperty.getNeighborhood());
                    property.setCity(updatedProperty.getCity());
                    property.setState(updatedProperty.getState());
                    property.setZipCode(updatedProperty.getZipCode());
                    property.setOwner(updatedProperty.getOwner());
                    property.setNumberOfRooms(updatedProperty.getNumberOfRooms());
                    property.setArea(updatedProperty.getArea());
                    property.setNumberOfBathrooms(updatedProperty.getNumberOfBathrooms());
                    property.setFullKitchen(updatedProperty.isFullKitchen());
                    property.setDescription(updatedProperty.getDescription());
                    property.setMaxGuests(updatedProperty.getMaxGuests());
                    property.setLongitude(updatedProperty.getLongitude());
                    property.setLatitude(updatedProperty.getLatitude());
                    property.setMinimumStay(updatedProperty.getMinimumStay());
                    return propertyRepository.save(property);
                })
                .orElseThrow(() -> new RuntimeException("Property not found"));
    }

    public void deleteProperty(Long id) {
        propertyRepository.deleteById(id);
    }
}
