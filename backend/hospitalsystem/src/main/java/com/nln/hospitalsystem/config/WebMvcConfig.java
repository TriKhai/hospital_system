package com.nln.hospitalsystem.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // map /uploads/** → folder uploads trên project
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/"); // folder uploads ở root project
    }
}
