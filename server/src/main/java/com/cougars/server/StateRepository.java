package com.cougars.server;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface StateRepository extends MongoRepository<StateData, String> {
    public State findByName(String name);
}