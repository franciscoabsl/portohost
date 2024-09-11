package com.franciscoabsl.portohost.services;

import com.franciscoabsl.portohost.models.Transaction;
import com.franciscoabsl.portohost.repositories.TransactionRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public record TransactionService(TransactionRepository transactionRepository) {

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    public Transaction getTransactionById(Long id) {
        return transactionRepository.findById(id).orElseThrow(() -> new RuntimeException("Transaction not found"));
    }

    public Transaction createTransaction(Transaction transaction) {
        return transactionRepository.save(transaction);
    }

    public Transaction updateTransaction(Long id, Transaction updatedTransaction) {
        return transactionRepository.findById(id)
                .map(transaction -> {
                    transaction.setBooking(updatedTransaction.getBooking());
                    transaction.setPayer(updatedTransaction.getPayer());
                    transaction.setReceiver(updatedTransaction.getReceiver());
                    transaction.setAmount(updatedTransaction.getAmount());
                    return transactionRepository.save(transaction); // Save updated transaction
                })
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
    }

    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }
}
