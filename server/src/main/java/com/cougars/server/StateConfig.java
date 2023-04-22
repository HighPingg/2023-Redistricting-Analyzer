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
        StateData data = repository.findByName("Ohio");
        HashMap<String, Object> geoJson = data.getDistrictPlanGeoJson(); //get all plans
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
        StateData data = repository.findByName("Nevada");
        HashMap<String, Object> geoJson = data.getDistrictPlanGeoJson(); //get all plans
        HashMap<String, DistrictPlan> districtPlans =  new HashMap<>();
        for(String plan:geoJson.keySet()){
            DistrictPlan districtPlan = new DistrictPlan(plan, geoJson.get(plan), new ArrayList<>(), 1, 2, "What?");
            districtPlans.put(plan, districtPlan);
        }
        return new State("Nevada",districtPlans);
    }

    @Bean
    @Qualifier("Illinois")
    public State Illinois() {
        StateData data = repository.findByName("Illinois");
        HashMap<String, Object> geoJson = data.getDistrictPlanGeoJson(); //get all plans
        HashMap<String, DistrictPlan> districtPlans =  new HashMap<>();
        for(String plan:geoJson.keySet()){
            DistrictPlan districtPlan = new DistrictPlan(plan, geoJson.get(plan), new ArrayList<>(), 1, 2, "What?");
            districtPlans.put(plan, districtPlan);
        }
        return new State("Illinois",districtPlans);
    }
}