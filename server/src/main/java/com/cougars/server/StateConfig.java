package com.cougars.server;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.beans.factory.annotation.Qualifier;

import java.util.ArrayList;

@Configuration
@ComponentScan("com.cougars.server")
public class StateConfig {
    @Bean
    @Qualifier("Ohio")
    public State Ohio() {
        return new State("Ohio", new ArrayList<>());
    }

    @Bean
    @Qualifier("Nevada")
    public State Nevada() {
        return new State("Nevada", new ArrayList<>());
    }

    @Bean
    @Qualifier("Illinois")
    public State Illinois() {
        return new State("Illinois", new ArrayList<>());
    }
}