package com.franciscoabsl.portohost.services;

import com.franciscoabsl.portohost.models.User;
import com.franciscoabsl.portohost.repositories.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public record UserService(UserRepository userRepository) {

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(Long id, User updatedUser) {
        return userRepository.findById(id)
                .map(user -> userRepository.save(updatedUser))
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}
