package com.example.consumer.service;

import com.example.consumer.model.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;
import reactor.core.scheduler.Schedulers;

@Service
@Slf4j
public class KafkaConsumerService {

    private final Sinks.Many<Message> messageSink = Sinks.many().multicast().onBackpressureBuffer();
    private static final String TOPIC_NAME = "survey-topic";

    @KafkaListener(topics = TOPIC_NAME, groupId = "webflux-consumer-group")
    public void consume(Message message) {
        log.info("Received message: {}", message);
        messageSink.tryEmitNext(message)
                .orThrow();
    }

    public Flux<Message> getMessageStream() {
        return messageSink.asFlux()
                .publishOn(Schedulers.boundedElastic())
                .onBackpressureBuffer()
                .doOnNext(message -> log.debug("Streaming message: {}", message))
                .doOnError(error -> log.error("Error in message stream: {}", error.getMessage()));
    }
}