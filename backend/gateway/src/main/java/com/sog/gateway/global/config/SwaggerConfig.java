package com.sog.gateway.global.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springdoc.core.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI apiInfo() {
        return new OpenAPI().info(new Info().title("Microservices API").version("1.0.0"));
    }

    @Bean
    public GroupedOpenApi userApiGroup() {
        return GroupedOpenApi.builder()
            .group("User API")
            .pathsToMatch("/api/user/**")
            .build();
    }

    @Bean
    public GroupedOpenApi stockApiGroup() {
        return GroupedOpenApi.builder()
            .group("Stock API")
            .pathsToMatch("/api/stock/**")
            .build();
    }

    @Bean
    public GroupedOpenApi newsApiGroup() {
        return GroupedOpenApi.builder()
            .group("News API")
            .pathsToMatch("/api/news/**")
            .build();
    }
}