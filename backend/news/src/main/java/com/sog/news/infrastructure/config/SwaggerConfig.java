package com.sog.news.infrastructure.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI newsApiOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("News API")
                        .description("뉴스 관련 API")
                        .version("v1.0.0"));
    }
}