package com.example.producer.controller;

import com.example.producer.model.Message;
import com.example.producer.service.KafkaProducerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {

    private final KafkaProducerService producerService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<Message> sendMessage(@RequestBody Mono<Message> messageMono) {
        return messageMono.flatMap(producerService::sendMessage);
    }
}