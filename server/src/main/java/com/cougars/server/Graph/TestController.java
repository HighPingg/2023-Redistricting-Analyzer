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
    private State state;
    @RequestMapping(value = "/testing", produces="application/json")
    public State getGraph() {
        return this.state;
    }
}
