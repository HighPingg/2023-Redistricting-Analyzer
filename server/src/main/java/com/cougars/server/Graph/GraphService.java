package com.cougars.server;

import org.springframework.stereotype.Service;
@Service
public class GraphService {
    private Graph testData = new Graph(Graph.States.OH,Graph.GraphType.BOXWHISKER);
    public Graph getGraphData(){
        return testData;
    }
}