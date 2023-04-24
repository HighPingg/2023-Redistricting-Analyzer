package com.cougars.server;
import lombok.Data;

import java.util.HashMap;
import java.util.ArrayList;
@Data
public class District{
    private Integer districtNumber;
    private ArrayList<Candidate> candidates;
    private Double geometricArea;
    private Double medianIncome;
    private Double geographicVariation;
    private Double populationVariation;

    public District(Integer districtNumber, ArrayList<Candidate> candidates, Double geometricArea, Double medianIncome, Double geographicVariation, Double populationVariation) {
        this.districtNumber = districtNumber;
        this.candidates = candidates;
        this.geometricArea = geometricArea;
        this.medianIncome = medianIncome;
        this.geographicVariation = geographicVariation;
        this.populationVariation = populationVariation;
    }
}
