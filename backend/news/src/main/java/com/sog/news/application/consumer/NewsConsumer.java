package com.sog.news.application.consumer;

import com.sog.news.domain.model.News;
import com.sog.news.domain.repository.NewsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NewsConsumer {

    private final NewsRepository newsRepository;

    @KafkaListener(topics = "NEWS-TEST", groupId = "testNews", containerFactory = "newsKafkaListenerContainerFactory")
    public void processGameResults(News news, Acknowledgment ack) {
        System.out.println("news.toString() = " + news.toString());
        newsRepository.save(news);
    }
}
