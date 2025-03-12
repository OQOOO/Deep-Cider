package com.deepcider.coreserver.services;

import org.springframework.stereotype.Service;

@Service
public class PromptWrapper {

    public String validateLogic(String message) {
        String prompt = String.format("""
            user: %s
            AI:
            """, message);

        return prompt;
    }

    public String metaphor(String message) {
        String prompt = String.format("""
            user: %s
            AI-metaphor:
            """, message);

        return prompt;
    }
}
