package com.cougars.server;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashMap;
@Data
public class State{
    private String name;
    private HashMap<String, DistrictPlan> districtPlans;
    private Ensemble ensemble;

    public State(String name, HashMap<String, DistrictPlan> districts, Ensemble ensemble) {
        this.name = name;
        this.districtPlans = districts;
        this.ensemble = ensemble;
    }

    public State(String name, HashMap<String, DistrictPlan> districts){
        this.name = name;
        this.districtPlans = districts;
    }
}
