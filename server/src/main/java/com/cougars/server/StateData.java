package com.cougars.server;

import org.springframework.data.annotation.Id;

public class StateData {

    @Id
    public String id;
    public String name;
    public Object districtPlanGeoJson;
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