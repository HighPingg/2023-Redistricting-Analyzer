package com.cougars.server;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.beans.factory.annotation.Qualifier;

@RestController
public class TestController {

    @Autowired
    @Qualifier("Nevada")
    private State stateNevada;

    @Autowired
    @Qualifier("Ohio")
    private State stateasdf;

    @Autowired
    @Qualifier("Nevada")
    private State stateOhi;
    @RequestMapping(value = "/testing{state}", produces="application/json")
    public State getGraph(@PathVariable String state) {
        return stateNevada;
    }
}
