package com.franciscoabsl.portohost.models;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public record User(
        @Id @GeneratedValue(strategy = GenerationType.IDENTITY) Long id,
        String name,
        String street,
        String number,
        String complement,
        String neighborhood,
        String city,
        String state,
        String zipCode,
        LocalDate birthDate,
        String cpf,
        String email,
        String pix,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        @Enumerated(EnumType.STRING) UserType userType
) {}

