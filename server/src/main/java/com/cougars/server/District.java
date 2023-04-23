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


    public District(Integer districtNumber, Candidate incumbent, ArrayList<Candidate> candidates, Candidate winner, Double geometricArea, Double medianIncome, Double averageAge) {
        this.districtNumber = districtNumber;
        this.incumbent = incumbent;
        this.candidates = candidates;
        this.winner = winner;
        this.geometricArea = geometricArea;
        this.medianIncome = medianIncome;
        this.averageAge = averageAge;
    }
}
