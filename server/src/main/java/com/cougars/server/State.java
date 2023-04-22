package com.cougars.server;
import lombok.Data;

import java.util.ArrayList;
@Data
public class State{
    private String name;
    private ArrayList<DistrictPlan> districtPlans;
    private Ensemble ensemble;

    public State(String name, ArrayList<DistrictPlan> districts, Ensemble ensemble) {
        this.name = name;
        this.districtPlans = districts;
        this.ensemble = ensemble;
    }

    public State(String name, ArrayList<DistrictPlan> districts){
        this.name = name;
        this.districtPlans = districts;
    }
}
