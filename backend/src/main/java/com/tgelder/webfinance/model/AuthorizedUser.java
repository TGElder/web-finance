package com.tgelder.webfinance.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
public class AuthorizedUser {

  @Id
  @GeneratedValue
  Long id;
  String googleId;

  public AuthorizedUser(String googleId) {
    this.googleId = googleId;
  }

  // Required by JPA
  AuthorizedUser() {

  }

}
