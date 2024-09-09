package com.franciscoabsl.portohost.models;

import jakarta.persistence.*;

@Entity
public record Property(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id,
        String street,
        String number,
        String complement,
        String neighborhood,
        String city,
        String state,
        String zipCode,
        @ManyToOne User owner,
        int numberOfRooms,
        double area,
        int numberOfBathrooms,
        boolean fullKitchen,
        String description,
        int maxGuests,
        double longitude,
        double latitude,
        int minimumStay
) {}
