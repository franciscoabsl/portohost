package com.franciscoabsl.portohost.repositories;

import com.franciscoabsl.portohost.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
