package com.wordcount.service;

import org.springframework.stereotype.Service;

@Service
public class WordCountService {
    public int countWords(String text) {
        if (text == null || text.trim().isEmpty()) {
            return 0;
        }
        return text.trim().split("\\s+").length;
    }
}