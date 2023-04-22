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
    private State Nevada;

    @Autowired
    @Qualifier("Ohio")
    private State Ohio;

    @Autowired
    @Qualifier("Illinois")
    private State Illinois;

    /**
     * Gets GeoJSON object requested through POST request.
     * 
     * @return the GeoJSON object requested.
     */
    @RequestMapping(value = "/geojson/{state}", produces="application/json")
    public Object getGeoJSON(@PathVariable String state){
        String fileName = null;

        switch (state) {
            case "IL":
                return Illinois.getDistrictPlans().get("2020").getGeoJson();
            
            case "OH":
                return Ohio.getDistrictPlans().get("2020").getGeoJson();

            case "NV":
                return Nevada.getDistrictPlans().get("2020").getGeoJson();

            default:
                throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "GeoJSON for " + state + " not found."
                );
        }
    }
}

class GeoJSONRequest {
    public String mapType;
}
