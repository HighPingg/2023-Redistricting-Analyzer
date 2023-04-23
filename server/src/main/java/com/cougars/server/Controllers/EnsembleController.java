package com.cougars.server;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.server.ResponseStatusException;

import org.springframework.beans.factory.annotation.Qualifier;

@RestController
public class EnsembleController {
    @Autowired
    @Qualifier("Nevada")
    private State Nevada;
    @Autowired
    @Qualifier("Ohio")
    private State Ohio;

    @Autowired
    @Qualifier("Illinois")
    private State Illinois;


    @RequestMapping(value = "/ensemble/{state}/{plan}", produces="application/json")
    public Ensemble getEnsemble(@PathVariable("state") String state, @PathVariable("plan") String plan){
        switch (state) {
            case "IL":
                return Illinois.getDistrictPlans().get(plan).getEnsemble();
            case "OH":
                return Ohio.getDistrictPlans().get(plan).getEnsemble();
            case "NV":
                return Nevada.getDistrictPlans().get(plan).getEnsemble();

            default:
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Ensemble for " + state + " not found."
                );
        }
    }
}
