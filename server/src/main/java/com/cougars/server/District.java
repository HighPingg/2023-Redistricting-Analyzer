package com.cougars.server;
import lombok.Data;

import java.util.HashMap;
import java.util.ArrayList;
@Data
public class District{
    private Integer districtNumber;
    private Candidate incumbent;
    private ArrayList<Candidate> candidates;
    private Double geometricArea;
    private Double medianIncome;

    public District(Integer districtNumber, Candidate incumbent, ArrayList<Candidate> candidates, Double geometricArea, Double medianIncome) {
        this.districtNumber = districtNumber;
        this.incumbent = incumbent;
        this.candidates = candidates;
        this.geometricArea = geometricArea;
        this.medianIncome = medianIncome;
    }
}
