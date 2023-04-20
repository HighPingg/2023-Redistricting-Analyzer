package com.cougars.server;
import lombok.Data;

import java.util.ArrayList;
@Data
public class State{
    private String name;
    private ArrayList<District> districts;
    private Ensemble ensemble;

    public State(String name, ArrayList<District> districts, Ensemble ensemble) {
        this.name = name;
        this.districts = districts;
        this.ensemble = ensemble;
    }

    public State(String name, ArrayList<District> districts){
        this.name = name;
        this.districts = districts;
    }
}
