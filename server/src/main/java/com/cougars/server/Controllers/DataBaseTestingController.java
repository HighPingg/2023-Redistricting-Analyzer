package com.cougars.server;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.beans.factory.annotation.Qualifier;

@RestController
public class DataBaseTestingController {

    @Autowired
    private StateRepository repository;

    @Autowired
    @Qualifier("Nevada")
    private State Nevada;

    @RequestMapping(value = "/database", produces="application/json")
//    @PathVariable String state
    public State getDataBaseData() {
        return(repository.findByName("Ohio"));
    }
    @RequestMapping(value = "/2database", produces="application/json")
//    @PathVariable String state
    public Object getOhioTest() {
        return(Nevada.getDistrictPlans().get("2022").getEnsemble());
    }
}
