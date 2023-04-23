package com.cougars.server;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.ArrayList;
import java.util.HashMap;

@Configuration
@ComponentScan("com.cougars.server")
public class StateConfig {
    @Autowired
    private StateRepository repository;

    @Bean
    @Qualifier("Ohio")
    public State Ohio() {
        return repository.findByName("Ohio");
    }

    @Bean
    @Qualifier("Illinois")
    public State Illinois() {
        return repository.findByName("Illinois");
    }

    @Bean
    @Qualifier("Nevada")
    public State Nevada() {
      return repository.findByName("Nevada");
    }
}