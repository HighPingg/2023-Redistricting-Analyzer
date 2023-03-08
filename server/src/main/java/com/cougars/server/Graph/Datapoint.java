package com.cougars.server;
import java.util.ArrayList;
import lombok.Data;
@Data
    public class Datapoint{
        public String x;
        public ArrayList<Integer> y;
        public Datapoint(String title, ArrayList<Integer> data){
            this.x = title;
            this.y = data;
        }
    }