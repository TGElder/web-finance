package com.tgelder.webfinance.security;

import com.tgelder.webfinance.persistence.AuthorizedUserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.oauth2.resource.AuthoritiesExtractor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
@Slf4j
public class GoogleAuthorityExtractor implements AuthoritiesExtractor {

  @Autowired
  private AuthorizedUserRepository authorizedUserRepository;

  @Override
  public List<GrantedAuthority> extractAuthorities(Map<String, Object> map) {
    String id = (String) map.get("id");
    if (!this.authorizedUserRepository.findByGoogleId(id).isEmpty()) {
      return AuthorityUtils.createAuthorityList("ROLE_USER");
    } else {
      return AuthorityUtils.createAuthorityList();
    }
  }
}