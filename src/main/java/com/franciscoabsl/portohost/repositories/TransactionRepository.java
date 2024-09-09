package com.franciscoabsl.portohost.repositories;

import com.franciscoabsl.portohost.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
