package com.cougars.server;
//import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.ArrayList;
import lombok.Data;
@Data
public class Graph{
    public enum States{OH,NV,IL} //Three states we can have

    public String state;
    public String graphTitle;

    public ArrayList<Datapoint> data;

    public Graph(States state, String graphTitle, ArrayList<Datapoint> data){
        this.state = state.name();
        this.graphTitle = graphTitle;
        this.data = data;
    }
}
