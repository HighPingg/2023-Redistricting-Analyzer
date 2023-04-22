package com.cougars.server;
import lombok.Data;

import java.util.Set;
@Data
public class State{
    private String name;
    private Set<DistrictPlan> districts;
    private Ensemble ensemble;

    public State(String name, Set<DistrictPlan> districts, Ensemble ensemble) {
        this.name = name;
        this.districts = districts;
        this.ensemble = ensemble;
    }

    public State(String name, Set<DistrictPlan> districts){
        this.name = name;
        this.districts = districts;
    }
}
