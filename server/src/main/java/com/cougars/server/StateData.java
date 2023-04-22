package com.cougars.server;

import lombok.Data;
import org.springframework.data.annotation.Id;
import java.util.HashMap;
@Data
public class StateData {

    @Id
    public String id;
    public String name;
    public HashMap<String, Object> districtPlansGeoJson;
    public StateData() {}
    public StateData(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return String.format(
                "StateTest:[id=%s, name='%s]",
                id, name);
    }

}