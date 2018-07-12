package com.tgelder.webfinance;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "com.tgelder.webfinance")
@Getter
@Setter
public class Config {

  private String authorizedGoogleIds;

}
