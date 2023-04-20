package com.cougars.server;
import lombok.Data;
@Data
public class Candidate{
    private String name;
    private Integer totalVotes;
    private String party;

    public Candidate(String name, Integer totalVotes, String party) {
        this.name = name;
        this.totalVotes = totalVotes;
        this.party = party;
    }
}
