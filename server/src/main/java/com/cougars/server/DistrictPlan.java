package com.cougars.server;
import lombok.Data;

import java.util.ArrayList;
import java.util.HashMap;
@Data
public class DistrictPlan{
    private Object geoJson;
    private ArrayList<District> districts;
    private Integer numDistrictPlan;
    private Integer numIncumbents;
    private Ensemble ensemble;
    private ArrayList<Candidate> incumbentsData;
    private HashMap<String, Object> graphs;
    private HashMap<String, Double> geoJSONCenter;


    public DistrictPlan(Object geoJson, ArrayList<District> districts, Integer numDistrictPlan, Integer numIncumbents, Ensemble ensemble, ArrayList<Candidate> incumbentsData, HashMap<String, Object> graphs, HashMap<String, Double> geoJSONCenter) {
        this.geoJson = geoJson;
        this.districts = districts;
        this.numDistrictPlan = numDistrictPlan;
        this.numIncumbents = numIncumbents;
        this.ensemble = ensemble;
        this.incumbentsData = incumbentsData;
        this.graphs = graphs;
        this.geoJSONCenter = geoJSONCenter;
    }
}
