package com.cougars.server;
import lombok.Data;

import java.util.ArrayList;

@Data
public class Ensemble{
    private Integer numDistrictPlans;
    private Integer numIncumbents;
    private Integer numIncumbentsPredictedtoWin;
    private Double averageGeoVariation;
    private Double averagePopVariation;
    private String redistrictParty;


    public Ensemble() {
    }

    public Ensemble(Integer numDistrictPlans, Integer numIncumbents, Integer numIncumbentsPredictedtoWin, Double averageGeoVariation, Double averagePopVariation, String redistrictParty) {
        this.numDistrictPlans = numDistrictPlans;
        this.numIncumbents = numIncumbents;
        this.numIncumbentsPredictedtoWin = numIncumbentsPredictedtoWin;
        this.averageGeoVariation = averageGeoVariation;
        this.averagePopVariation = averagePopVariation;
        this.redistrictParty = redistrictParty;
    }
}
