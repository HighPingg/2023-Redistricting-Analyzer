package com.cougars.server;
import java.util.ArrayList;
import lombok.Data;
import java.util.HashMap;

@Data
public class District{
    private String name;
    private Integer number;
    private String winner;
    private String house;
    private Integer votes;
    private ArrayList<String> loser;
    private ArrayList<String> lowerHouse;
    private ArrayList<String> loservotes;
    private Integer totalPopulation;
    private HashMap<Year, Float> geographicSizes;
    private HashMap<Year, HashMap<Race, Integer>> demographics;

}
