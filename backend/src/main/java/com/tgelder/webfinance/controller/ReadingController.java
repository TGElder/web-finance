package com.tgelder.webfinance.controller;

import com.tgelder.webfinance.model.Account;
import com.tgelder.webfinance.model.Reading;
import com.tgelder.webfinance.model.Transfer;
import com.tgelder.webfinance.persistence.AccountRepository;
import com.tgelder.webfinance.persistence.ReadingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/readings")
public class ReadingController {

  @Autowired
  private AccountRepository accountRepository;
  @Autowired
  private ReadingRepository readingRepository;

  @RequestMapping(method = RequestMethod.GET, value = "/{id}")
  ResponseEntity<Reading> get(@PathVariable Long id) {
    return this.readingRepository.findById(id)
                                 .map(ResponseEntity::ok)
                                 .orElse(ResponseEntity.notFound().build());
  }

  @RequestMapping(method = RequestMethod.GET, value = "")
  ResponseEntity<Iterable<Reading>> getAll(@RequestParam(value = "account", required = false) Long accountId) {
    if (accountId == null) {
      return ResponseEntity.ok(this.readingRepository.findAll());
    }

    Optional<Account> account = this.accountRepository.findById(accountId);

    if (account.isPresent()) {
      return ResponseEntity.ok(this.readingRepository.findByAccount(account.get()));
    } else {
      return ResponseEntity.notFound().build();
    }
  }

  @RequestMapping(method = RequestMethod.POST, value = "")
  ResponseEntity<Reading> post(@RequestBody @Validated(GenericGetPostController.PostValidation.class) Reading reading) {
    readingRepository.save(reading);
    URI location = ServletUriComponentsBuilder
            .fromCurrentRequest().path("/{id}")
            .buildAndExpand(reading.getId()).toUri();
    return ResponseEntity.created(location).build();
  }

  // For validation groups
  public interface PostValidation {

  }

}
