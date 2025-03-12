//package com.deepcider.coreserver.config;
//
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//public class WebConfig implements WebMvcConfigurer {
//
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry.addMapping("/**")  // 모든 경로에 대해 CORS 허용
//                .allowedOrigins("*")  // 모든 출처에서의 요청을 허용 (특정 도메인만 허용하고 싶으면 URL을 넣음)
//                .allowedMethods("GET", "POST", "PUT", "DELETE")  // 허용할 HTTP 메서드 지정
//                .allowedHeaders("*")  // 모든 헤더를 허용
//                .allowCredentials(true);  // 인증 정보가 필요한 경우
//    }
//}
