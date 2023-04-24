package com.cougars.server;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
import java.util.HashMap;


@RestController
public class GraphController {
    @Autowired
    @Qualifier("Nevada")
    private State Nevada;
    @Autowired
    @Qualifier("Ohio")
    private State Ohio;

    @Autowired
    @Qualifier("Illinois")
    private State Illinois;


    @RequestMapping(value = "/graphs/{state}/{plan}", produces="application/json")
    public HashMap<String, Object> getGraphs(@PathVariable("state") String state, @PathVariable("plan") String plan){
        switch (state) {
            case "IL":
                return Illinois.getDistrictPlans().get(plan).getGraphs();
            case "OH":
                return Ohio.getDistrictPlans().get(plan).getGraphs();
            case "NV":
                return Nevada.getDistrictPlans().get(plan).getGraphs();

            default:
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Ensemble for " + state + " not found."
                );
        }
    }
    @RequestMapping(value = "/graph/{state}/{plan}/{type}", produces="application/json")
    public Object getGraph(@PathVariable("state") String state, @PathVariable("plan") String plan, @PathVariable("type") String type){
        switch (state) {
            case "IL":
                return Illinois.getDistrictPlans().get(plan).getGraphs().get(type);
            case "OH":
                return Ohio.getDistrictPlans().get(plan).getGraphs().get(type);
            case "NV":
                return Nevada.getDistrictPlans().get(plan).getGraphs().get(type);

            default:
                throw new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Graph for " + state + " not found."
                );
        }
    }
}
