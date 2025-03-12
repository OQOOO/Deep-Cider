package com.deepcider.coreserver.controllers;

import com.deepcider.coreserver.services.LLMApiClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
public class TestController {

    private final LLMApiClientService llmApiClientService;

    @Autowired
    public TestController(LLMApiClientService llmApiClientService) {
        this.llmApiClientService = llmApiClientService;
    }

//    @GetMapping("/test")
//    public Mono<String> test() {
//
//        var ans = llmApiClientService.postToLLMServer("test");
//
//        return ans;
//    }
}
