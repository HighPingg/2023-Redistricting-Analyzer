package com.cougars.server;
import lombok.Data;
@Data
public class Candidate{
    private String name;
    private Boolean winner;
    private Boolean incumbent;
    private Integer totalVotes;
    private String party;

    public Candidate(String name, Boolean winner, Integer totalVotes, String party) {
        this.name = name;
        this.winner = winner;
        this.totalVotes = totalVotes;
        this.party = party;
    }
}
