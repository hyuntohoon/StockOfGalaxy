package com.sog.news.global.exception.exceptions;

public class NewsNotFoundException extends RuntimeException {
    public NewsNotFoundException(String message) {
        super(message);
    }
}
