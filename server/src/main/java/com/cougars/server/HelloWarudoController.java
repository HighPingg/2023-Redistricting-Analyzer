package com.cougars.server;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWarudoController {

    @RequestMapping("/")
    public String helloWarudo() {
        return "Hello Warudo";
    }
}
