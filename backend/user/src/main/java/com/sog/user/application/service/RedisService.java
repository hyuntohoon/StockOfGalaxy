package com.sog.user.application.service;

import java.time.Duration;
import org.springframework.stereotype.Service;


public interface RedisService {

    void setValues(String key, String value);

    void setValues(String key, String value, Duration duration);

    String getValue(String key);

    void deleteValue(String key);

}
