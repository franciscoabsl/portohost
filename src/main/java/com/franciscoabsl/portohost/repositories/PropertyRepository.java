package com.franciscoabsl.portohost.repositories;

import com.franciscoabsl.portohost.models.Property;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PropertyRepository extends JpaRepository<Property, Long> {
}