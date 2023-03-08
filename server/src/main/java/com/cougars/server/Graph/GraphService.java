package com.cougars.server;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import java.util.ArrayList;

@Service
public class GraphService {

    //Given a state and its graph type will retrive the data.
    public Graph getGraphData(Graph.States state){
        //Add switch based on state and graph type when we have more data //TODO
        //NOT WORKING BELLOW
//        try {
//            ObjectMapper om = new ObjectMapper();
//            String json = "{\"State\": \"OH\" \"graphTitle\": \"Ensemble Data for Ohio\"}";
//            Graph graph = om.readValue(json, Graph.class);
//            return graph;
//        }
//        catch(Exception e){
//            return null;
//        }
            //For demo just
            return createTestData(state);
        };
    public Graph createTestData(Graph.States state){
        //Create dummy data, column for box whisker
        ArrayList<Integer> list = new ArrayList<>();
        list.add(2);
        list.add(3);
        list.add(7);

        //Create datapoint
        ArrayList<Datapoint> data = new ArrayList<>();
        data.add(new Datapoint("District 1 Test",list));
        String stateName = "";
        switch(state){
            case IL:
                stateName = "Illinois";
                break;
            case OH:
                stateName = "Ohio";
                break;
            case NV:
                stateName = "Nevada";
                break;
        }

        Graph testGraph = new Graph(state, stateName + " Ensemble data", data);
        return testGraph;
    }

}