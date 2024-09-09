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
                .map(property -> propertyRepository.save(updatedProperty))
                .orElseThrow(() -> new RuntimeException("Property not found"));
    }

    public void deleteProperty(Long id) {
        propertyRepository.deleteById(id);
    }
}
