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
        StateData OhioData = repository.findByName("Ohio");
        HashMap<String, Object> geoJson = OhioData.getDistrictPlansGeoJson(); //get all plans
        System.out.println(geoJson);
        HashMap<String, DistrictPlan> districtPlans =  new HashMap<>();
        for(String plan:geoJson.keySet()){
            DistrictPlan districtPlan = new DistrictPlan(plan, geoJson.get(plan), new ArrayList<>(), 1, 2, "What?");
            districtPlans.put(plan, districtPlan);
        }
        return new State("Ohio",districtPlans);
    }

    @Bean
    @Qualifier("Nevada")
    public State Nevada() {
        Ensemble ensemble = new Ensemble(1, 2, 3, 1.0, 2.0, "hello1", "Testing2", "3x", "4x", "5x");
        return new State("Nevada", new HashMap<>(), ensemble);
    }

    @Bean
    @Qualifier("Illinois")
    public State Illinois() {
        return new State("Illinois", new HashMap<>());
    }
}