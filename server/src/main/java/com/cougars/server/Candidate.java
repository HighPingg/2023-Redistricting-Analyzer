package com.cougars.server;
import lombok.Data;
@Data
public class Candidate{
    private String name;
    private Boolean winner;
    private Integer totalVotes;
    private String party;
    private Double geographicVariation;
    private Double populationVariation;

    public Candidate(String name, Integer totalVotes, String party, Double geographicVariation, Double populationVariation) {
        this.name = name;
        this.totalVotes = totalVotes;
        this.party = party;
        this.geographicVariation = geographicVariation;
        this.populationVariation = populationVariation;
    }
}
