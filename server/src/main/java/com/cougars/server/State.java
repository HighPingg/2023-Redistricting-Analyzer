package com.cougars.server;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashMap;
@Data
public class State{
    private String name;
    private HashMap<String, DistrictPlan> districtPlans;
    private Object incumbentTable; //Averages of the all the plans for incumbents

    public State(String name, HashMap<String, DistrictPlan> districtPlans, District incumbentTable) {
        this.name = name;
        this.districtPlans = districtPlans;
        this.incumbentTable = incumbentTable;
    }


    public State() {
    }
}
