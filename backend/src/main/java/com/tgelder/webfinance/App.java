package com.tgelder.webfinance;


import com.tgelder.webfinance.model.AuthorizedUser;
import com.tgelder.webfinance.persistence.AuthorizedUserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@Slf4j
public class App {

  public static void main(String[] args) {
    SpringApplication.run(App.class, args);
  }

  @Bean
  public CommandLineRunner populateUsers(Config config, AuthorizedUserRepository authorizedUserRepository) {
    return args -> {
      authorizedUserRepository.deleteAll();
      for (String googleId : config.getAuthorizedGoogleIds().split(",")) {
        authorizedUserRepository.save(new AuthorizedUser(googleId));
      }
    };
  }


}