package com.franciscoabsl.portohost.models;

import jakarta.persistence.*;

@Entity
public record Transaction(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id,
        @ManyToOne Booking booking,
        @ManyToOne User payer,
        @ManyToOne User receiver,
        double amount
) {}