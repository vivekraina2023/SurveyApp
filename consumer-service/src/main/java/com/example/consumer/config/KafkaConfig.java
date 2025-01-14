package com.example.consumer.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaConfig {
    @Bean
    public NewTopic surveyTopic() {
        return TopicBuilder.name("survey-topic")
                .partitions(6)
                .replicas(3)
                .build();
    }
}