package com.cougars.server;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.beans.factory.annotation.Qualifier;

@RestController
public class DistrictPlanController {
    @Autowired
    @Qualifier("Nevada")
    private State Nevada;
    @Autowired
    @Qualifier("Ohio")
    private State Ohio;

    @Autowired
    @Qualifier("Illinois")
    private State Illinois;


    @RequestMapping(value = "/availablePlans/{state}", produces="application/json")
    public State getAvailableDistrictPlans(@PathVariable String state) {
        switch (state) {
            case "IL":
                return Illinois.getDistrictPlans().keySet();
            case "OH":
                return Ohio.getDistrictPlans().keySet();
            case "NV":
                return Nevada.getDistrictPlans().keySet();

            default:
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "GeoJSON for " + state + " not found."
                );
        }
    }
}
