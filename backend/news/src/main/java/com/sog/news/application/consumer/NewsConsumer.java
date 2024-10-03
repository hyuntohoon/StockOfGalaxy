package com.sog.news.application.consumer;

import com.sog.news.domain.model.News;
import com.sog.news.domain.repository.NewsRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NewsConsumer {

    private final NewsRepository newsRepository;
    private static final Logger logger = LoggerFactory.getLogger(NewsConsumer.class);

    @KafkaListener(topics = "NEWS-TEST-LOCAL7", groupId = "testNews", containerFactory = "newsKafkaListenerContainerFactory")
    public void consumeNewsMessage(News news, Acknowledgment ack) {
        try {
            if (news.getCategory() != null) { // category ENUM 타입 매핑 실패 대비
                newsRepository.save(news);
                ack.acknowledge(); // 성공적으로 INSERT되면 ACK 전송
            }
        } catch (Exception e) {
            logger.error("DB INSERT 실패: {}", e.getMessage()); // ACK을 호출하지 않으므로 해당 메시지는 버려짐
        }
    }
}