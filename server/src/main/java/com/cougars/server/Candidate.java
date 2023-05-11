package com.cougars.server;
import lombok.Data;
@Data
public class Candidate{
    private String name;
    private Boolean winner;
    private Boolean incumbent;
    private Integer totalVotes;
    private String party;
    private Boolean safeSeat;

    public Candidate(String name, Boolean winner, Integer totalVotes, String party, Boolean safeSeat) {
        this.name = name;
        this.winner = winner;
        this.totalVotes = totalVotes;
        this.party = party;
        this.safeSeat = safeSeat;
    }
}