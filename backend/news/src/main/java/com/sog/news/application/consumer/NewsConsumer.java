package com.sog.news.application.consumer;

import com.sog.news.domain.dto.DailyKeywordFrequencyResponseDTO;
import com.sog.news.domain.dto.DailyStockFrequencyResponseDTO;
import com.sog.news.domain.dto.NewsConsumerResponseDTO;
import com.sog.news.domain.model.DailyKeywordFrequency;
import com.sog.news.domain.model.DailyStockFrequency;
import com.sog.news.domain.model.News;
import com.sog.news.domain.model.NewsKeyword;
import com.sog.news.domain.repository.DailyKeywordFrequencyRepository;
import com.sog.news.domain.repository.DailyStockFrequencyRepository;
import com.sog.news.domain.repository.NewsKeywordRepository;
import com.sog.news.domain.repository.NewsRepository;
import com.sog.news.global.NewsCategory;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NewsConsumer {

    private final NewsRepository newsRepository;
    private final NewsKeywordRepository newsKeywordRepository;
    private static final Logger logger = LoggerFactory.getLogger(NewsConsumer.class);
    private final DailyKeywordFrequencyRepository dailyKeywordFrequencyRepository;
    private final DailyStockFrequencyRepository dailyStockFrequencyRepository;

    @KafkaListener(topics = "NEWS-Topic", groupId = "News", containerFactory = "newsKafkaListenerContainerFactory")
    public void consumeNewsMessage(NewsConsumerResponseDTO newsConsumerResponseDTO, Acknowledgment ack) {
        try {
            // NewsCategory가 null일 경우 "기타" 카테고리로 설정
            if (newsConsumerResponseDTO.getCategory() == null) {
                newsConsumerResponseDTO.setCategory(NewsCategory.기타);
            }
            if (newsConsumerResponseDTO.getCategory() != null) { // category ENUM 타입 매핑 실패 대비
                // News 객체로 변환
                News news = newsConsumerResponseDTO.toEntity();

                // News 엔티티 저장
                News savedNews = newsRepository.save(news);

                // 키워드 저장
                List<String> keywords = newsConsumerResponseDTO.getKeywords();
                if (keywords != null) {
                    for (String keyword : keywords) {
                        NewsKeyword newsKeyword = NewsKeyword.fromDTO(savedNews, keyword);
                        newsKeywordRepository.save(newsKeyword);
                    }
                }

                ack.acknowledge(); // 성공적으로 INSERT되면 ACK 전송
            }
        } catch (Exception e) {
            logger.error("DB INSERT 실패: {}", e.getMessage()); // ACK을 호출하지 않으므로 해당 메시지는 버려짐
        }
    }

    @KafkaListener(topics = "DailyKeywordFrequency-Topic", groupId = "News", containerFactory = "dailyKeywordFrequencyKafkaListenerContainerFactory")
    public void dailyKeywordFrequencyMessage(DailyKeywordFrequencyResponseDTO dailyKeywordFrequencyResponseDTO, Acknowledgment ack) {
        try {
            // DTO를 엔티티로 변환
            DailyKeywordFrequency dailyKeywordFrequency = DailyKeywordFrequency.fromDTO(dailyKeywordFrequencyResponseDTO);

            // MongoDB에 데이터 저장
            dailyKeywordFrequencyRepository.save(dailyKeywordFrequency);

            // ACK 전송
            ack.acknowledge();
        } catch (Exception e) {
            logger.error("MongoDB INSERT 실패: {}", e.getMessage());
        }
    }

    @KafkaListener(topics = "DailyStockFrequency-Topic", groupId = "News", containerFactory = "dailyStockFrequencyKafkaListenerContainerFactory")
    public void dailyStockFrequencyMessage(DailyStockFrequencyResponseDTO dailyStockFrequencyResponseDTO, Acknowledgment ack) {
        try {
//             DTO를 엔티티로 변환 (필요한 경우)
            DailyStockFrequency dailyStockFrequency = DailyStockFrequency.fromDTO(dailyStockFrequencyResponseDTO);

            // MongoDB에 데이터 저장 (예시로, 저장하는 로직 추가)
            dailyStockFrequencyRepository.save(dailyStockFrequency);

            // 로그 출력
            System.out.println("dailyStockFrequencyResponseDTO.toString() = " + dailyStockFrequencyResponseDTO.toString());
            logger.info("받은 주식 빈도수: {}", dailyStockFrequencyResponseDTO);

            // ACK 전송
            ack.acknowledge();
        } catch (Exception e) {
            System.out.println("MongoDB INSERT 실패: {}" + e.getMessage());
        }
    }
}
