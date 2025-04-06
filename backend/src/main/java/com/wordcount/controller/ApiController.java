package com.wordcount.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend
@RequestMapping("/api")
public class ApiController {

    @PostMapping("/count")
    public int countWords(@RequestBody String text) {
        if (text == null || text.trim().isEmpty()) {
            return 0;
        }
        return text.trim().split("\\s+").length;
    }

    @GetMapping("/")
    public String home() {
        return "Word Count API is running! POST to /api/count with text to get word count.";
    }
}