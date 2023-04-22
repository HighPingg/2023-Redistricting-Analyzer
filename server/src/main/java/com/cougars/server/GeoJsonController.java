package com.cougars.server;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class GeoJsonController {

    @Autowired
    @Qualifier("Nevada")
    private State stateNevada;

    @Autowired
    @Qualifier("Ohio")
    private State Ohio;

    @Autowired
    @Qualifier("Nevada")
    private State stateOhi;

    /**
     * Gets GeoJSON object requested through POST request.
     * 
     * @return the GeoJSON object requested.
     */
    @RequestMapping(value = "/geojson/{state}", produces="application/json")
    public Object getGeoJSON(@PathVariable String state) throws FileNotFoundException {
        String fileName = null;

        switch (state) {
            case "IL":
                fileName = "src/assets/illinois_21.json";
                break;
            
            case "OH":
//                System.out.println(Ohio.getDistrictPlans().get("2020").getGeoJson());
                return Ohio.getDistrictPlans().get("2020").getGeoJson();

            case "NV":
                fileName = "src/assets/nevada_21.json";
                break; 

            default:
                throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "GeoJSON for " + state + " not found."
                );
        }

        // Read all contents of file.
        Scanner filein = new Scanner(new File(fileName));
        String fileContent = "";
        while (filein.hasNext()) {
            fileContent += filein.nextLine();
        }

        return fileContent;
    }
}

class GeoJSONRequest {
    public String mapType;
}
