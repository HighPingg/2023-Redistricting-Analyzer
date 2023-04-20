package com.cougars.server;
import lombok.Data;

import java.util.ArrayList;
@Data
public class DistrictPlan{
    private String name;
    private String geoJson; //TODO geoJSON in diagram
    private ArrayList<District> districts;
    private Integer numDistrictPlan;
    private Integer numIncumbents;
    private String incumbentsData; //TODO json in diagram

    public DistrictPlan(String name, String geoJson, ArrayList<District> districts, Integer numDistrictPlan, Integer numIncumbents, String incumbentsData) {
        this.name = name;
        this.geoJson = geoJson;
        this.districts = districts;
        this.numDistrictPlan = numDistrictPlan;
        this.numIncumbents = numIncumbents;
        this.incumbentsData = incumbentsData;
    }
}
