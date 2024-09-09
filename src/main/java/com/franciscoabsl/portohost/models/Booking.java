package com.franciscoabsl.portohost.models;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public record Booking(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id,
        @ManyToOne User guest,
        @ManyToOne Property property,
        LocalDate checkIn,
        LocalDate checkOut,
        double totalValue
) {}
