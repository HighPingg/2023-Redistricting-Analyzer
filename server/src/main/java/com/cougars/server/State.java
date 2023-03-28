package com.cougars.server;
import java.util.ArrayList;
import lombok.Data;

@Data
public class State{
    private String name;
    private ArrayList<District> districts;

    public State(String name, ArrayList<District> districts){
        this.name = name;
        this.districts = districts;
    }
}
