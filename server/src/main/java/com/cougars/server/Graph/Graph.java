package com.cougars.server;

import lombok.Data;
//This class will deal with the graphing of stuff.
@Data
public class Graph {
    public enum States{OH,NV,IL} //Three states we can have
    public enum GraphType{BOXWHISKER,PIE,STACKEDBAR}//Types of graphs
    String state;
    GraphType graphType;
//    JSONObject data;

//    public Graph(States state, GraphType graphType,JSONObject data){
    public Graph(States state, GraphType graphType){
        this.state = state.name();
        this.graphType = graphType;
//        this.data = data;
    }
}