package com.deepcider.coreserver.services;

import com.deepcider.coreserver.VOs.MessageVO;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.Console;
import java.util.HashMap;
import java.util.Map;

@Service
public class LLMApiClientService {

    private final WebClient webClient;

    public LLMApiClientService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("http://host.docker.internal:5000").build();
    }

    public Flux<String> postToLLMServer(String prompt) {

        // json 전송 형식
        Map<String, String> payload = new HashMap<>();
        payload.put("prompt", prompt);

        return webClient.post()
                .uri("/generate")
                .bodyValue(payload)
                .retrieve()
                .bodyToFlux(String.class);
    }
}
