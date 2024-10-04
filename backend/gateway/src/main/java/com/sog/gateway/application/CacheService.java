package com.sog.gateway.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class CacheService {
    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public Object getCache(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public void setCache(String key, Object value) {
        redisTemplate.opsForValue().set(key, value);
    }

    public boolean hasKey(String key) {
        return redisTemplate.hasKey(key);
    }
}
