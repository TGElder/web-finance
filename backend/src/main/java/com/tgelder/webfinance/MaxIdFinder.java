package com.tgelder.webfinance;

import com.tgelder.webfinance.model.Transaction;
import com.tgelder.webfinance.persistence.TransactionRepository;
import com.tgelder.webfinance.persistence.TransferRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.OptionalLong;
import java.util.stream.StreamSupport;

@Component
@Slf4j
public class MaxIdFinder {

    private final TransferRepository repo;

    @Autowired
    public MaxIdFinder(TransferRepository repo) {
        this.repo = repo;
        OptionalLong maxId = StreamSupport.stream(repo.findAll().spliterator(), false).mapToLong(Transaction::getId).max();
        log.info("Max ID is " + maxId.getAsLong());
    }



}
