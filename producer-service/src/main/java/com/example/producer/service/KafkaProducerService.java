package com.example.producer.service;

import com.example.producer.config.KafkaTopicConfig;
import com.example.producer.model.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaProducerService {

    private final KafkaTemplate<String, Object> kafkaTemplate;

    public Mono<Message> sendMessage(Message message) {
        return Mono.just(message)
                .map(msg -> {
                    msg.setId(UUID.randomUUID().toString());
                    msg.setTimestamp(System.currentTimeMillis());
                    return msg;
                })
                .flatMap(msg -> Mono
                        .fromFuture(
                                kafkaTemplate.send(KafkaTopicConfig.TOPIC_NAME, msg.getId(), msg).toCompletableFuture())
                        .subscribeOn(Schedulers.boundedElastic())
                        .doOnSuccess(result -> log.info("Message sent successfully: {}", msg))
                        .doOnError(error -> log.error("Error sending message: {}", error.getMessage()))
                        .thenReturn(msg));
    }
}