package com.cougars.server;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
public class GeoJsonController {

    /**
     * Gets GeoJSON object requested through POST request.
     * 
     * @return the GeoJSON object requested.
     */
    @PostMapping("/geojson")
    public String getGeoJSON(@RequestBody GeoJSONRequest obj) throws FileNotFoundException {
        String fileName = null;

        switch (obj.mapType) {
            case "IL":
                fileName = "src/assets/illinois_21.json";
                break;
            
            case "OH":
                fileName = "src/assets/ohio_21.json";
                break; 

            case "NV":
                fileName = "src/assets/nevada_21.json";
                break; 

            default:
                throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "GeoJSON for " + obj.mapType + " not found."
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
