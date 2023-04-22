package com.cougars.server;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashMap;
@Data
public class State{
    private String name;
    private HashMap<String, DistrictPlan> districtPlans;
    public State(String name, HashMap<String, DistrictPlan> districts){
        this.name = name;
        this.districtPlans = districts;
    }

    public State() {
    }
}
