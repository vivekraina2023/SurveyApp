package com.example.consumer.handler;

import com.example.consumer.model.Message;
import com.example.consumer.service.KafkaConsumerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class MessageHandler {

    private final KafkaConsumerService consumerService;

    public Mono<ServerResponse> streamMessages(ServerRequest request) {
        return ServerResponse.ok()
                .contentType(MediaType.TEXT_EVENT_STREAM)
                .body(consumerService.getMessageStream()
                        .onBackpressureBuffer(), Message.class);
    }
}