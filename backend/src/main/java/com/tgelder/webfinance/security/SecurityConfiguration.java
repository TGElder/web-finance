package com.tgelder.webfinance.security;

import org.springframework.boot.autoconfigure.security.oauth2.client.EnableOAuth2Sso;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.csrf.CookieCsrfTokenRepository;

@EnableOAuth2Sso
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.authorizeRequests()
        .antMatchers(HttpMethod.OPTIONS).permitAll()
        .antMatchers("/resources/hexagon/**").permitAll()
        .antMatchers("/unauthorized.controller.js").permitAll()
        .anyRequest().hasRole("USER")
        .and().csrf().csrfTokenRepository(CookieCsrfTokenRepository.withHttpOnlyFalse())
        .and().exceptionHandling().accessDeniedPage("/unauthorized.html")
        .and().logout().logoutSuccessUrl("/").permitAll();
  }


  @Bean
  public AuthenticationManager authenticationManagerBean() throws Exception {
    // Prevents Spring Boot from providing default user/password login
    return super.authenticationManagerBean();
  }

}