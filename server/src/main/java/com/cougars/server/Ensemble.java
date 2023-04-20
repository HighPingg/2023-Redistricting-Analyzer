package com.cougars.server;
import lombok.Data;

import java.util.ArrayList;

@Data
public class Ensemble{
    private Integer numDistrictPlan;
    private Integer numIncumbents;
    private Integer numIncumbentsPredictedtoWin;
    private Double averageGeoVariation;
    private Double averagePopVariation;

    //TODO graphs are strings, not sure if thats right
    private String geoVariationGraph;
    private String popVariationGraph;
    private String ageVariationGraph;
    private String raceVariationGraph;
    private String repubDemosplitGraph;

    public Ensemble(Integer numDistrictPlan, Integer numIncumbents, Integer numIncumbentsPredictedtoWin, Double averageGeoVariation, Double averagePopVariation, String geoVariationGraph, String popVariationGraph, String ageVariationGraph, String raceVariationGraph, String repubDemosplitGraph) {
        this.numDistrictPlan = numDistrictPlan;
        this.numIncumbents = numIncumbents;
        this.numIncumbentsPredictedtoWin = numIncumbentsPredictedtoWin;
        this.averageGeoVariation = averageGeoVariation;
        this.averagePopVariation = averagePopVariation;
        this.geoVariationGraph = geoVariationGraph;
        this.popVariationGraph = popVariationGraph;
        this.ageVariationGraph = ageVariationGraph;
        this.raceVariationGraph = raceVariationGraph;
        this.repubDemosplitGraph = repubDemosplitGraph;
    }
}
