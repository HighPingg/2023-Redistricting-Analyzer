package com.cougars.server;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
@RestController
public class HelloWarudoController {

    //GET
    @RequestMapping("/data")
    public String helloWarudo() {
        return "Hello Warudo";
    }
}
