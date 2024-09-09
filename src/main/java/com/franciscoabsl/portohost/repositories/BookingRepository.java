package com.franciscoabsl.portohost.repositories;

import com.franciscoabsl.portohost.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Long> {
}