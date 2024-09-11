package com.franciscoabsl.portohost.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "properties")
@Data
@NoArgsConstructor
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String street;
    private String number;
    private String complement;
    private String neighborhood;
    private String city;
    private String state;
    private String zipCode;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User owner;

    private int numberOfRooms;
    private double area;
    private int numberOfBathrooms;
    private boolean fullKitchen;
    private String description;
    private int maxGuests;
    private double longitude;
    private double latitude;
    private int minimumStay;

}