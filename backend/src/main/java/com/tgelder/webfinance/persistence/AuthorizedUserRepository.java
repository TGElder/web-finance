package com.tgelder.webfinance.persistence;

import com.tgelder.webfinance.model.AuthorizedUser;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AuthorizedUserRepository extends CrudRepository<AuthorizedUser, Long> {

  List<AuthorizedUser> findByGoogleId(String id);

}
