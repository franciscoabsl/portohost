package com.franciscoabsl.portohost.services;

import com.franciscoabsl.portohost.models.Booking;
import com.franciscoabsl.portohost.repositories.BookingRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public record BookingService(BookingRepository bookingRepository) {

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id).orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    public Booking createBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public Booking updateBooking(Long id, Booking updatedBooking) {
        return bookingRepository.findById(id)
                .map(booking -> bookingRepository.save(updatedBooking))
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}
