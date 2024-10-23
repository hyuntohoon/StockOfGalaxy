package com.sog.gateway.application;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class CacheService {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    public String getCache(String key) {
        return redisTemplate.opsForValue().get(key); // JSON 문자열로 저장
    }

    public void setCache(String key, String value) {
        redisTemplate.opsForValue().set(key, value); // JSON 문자열을 저장
    }

    public boolean hasKey(String key) {
        return redisTemplate.hasKey(key);
    }
}
