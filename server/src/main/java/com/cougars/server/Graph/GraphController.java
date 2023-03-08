package com.cougars.server;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class GraphController {

    @Autowired
    private GraphService graphService;
    @RequestMapping(value = "/graphdata/{state}", produces="application/json")
    public Graph getGraph(@PathVariable String state) {
            return graphService.getGraphData(Graph.States.valueOf(state));
    }
}
