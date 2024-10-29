
# Stock Of Galaxy (스톡 오브 갤럭시)

Stock Of Galaxy(스톡 오브 갤럭시)은 특정 주식 종목의 과거 주가 등락 요인과 관련 뉴스를 한눈에 확인할 수 있는 플랫폼입니다. 주식을 행성에 비유하여 시각적으로 표현하고, 사용자가 직관적으로 과거 주가와 관련 뉴스를 탐색할 수 있도록 다양한 기능을 제공합니다.

![image](https://github.com/user-attachments/assets/bd31b378-548d-4057-89a3-28b6e6dac81a)
### 프로젝트 진행 기간
2024.08.19(월) ~ 2024.10.11(금)
삼성 청년 SW 아카데미(SSAFY) 11기 2학기 자율 프로젝트

## 시스템 설계도
![시스템아키](https://github.com/user-attachments/assets/f2af60c2-770f-43c8-986e-8fe2d483c71c)

## 주요 기능

### 1. 행성(주식) 탐사 기능
- **타임머신**: 특정 시점으로 이동하여 과거 주식 정보 및 뉴스 제공. 차트를 통해 해당 시점의 주가 변동과 뉴스를 한눈에 볼 수 있습니다.

![image](https://github.com/user-attachments/assets/63f89137-28d9-4d49-a597-4b59ea878f2d)

![image](https://github.com/user-attachments/assets/e4d00dee-0053-43aa-a4d9-5da102d2bfbb)

![image](https://github.com/user-attachments/assets/c4e88704-64b4-4630-88e4-b8731e058d89)

- **주식 관련 뉴스**: AI 기반으로 기사 요약 및 관련된 주식을 키워드 기반으로 표시.

![image](https://github.com/user-attachments/assets/52342af0-f781-4403-9340-6f5bad5f1cd5)

![image](https://github.com/user-attachments/assets/48c79b3f-8070-4e61-8329-e0adca26bd27)

![image](https://github.com/user-attachments/assets/b12b6391-f6e9-497e-a5b3-dd9ab873fef7)

- **워드 클라우드**: 관련 뉴스에서 자주 등장하는 키워드 시각화.

![image](https://github.com/user-attachments/assets/dbd12566-5cd0-4bb5-9798-7fda3499707a)

- **주식 상세 정보**: 시가, 종가, 거래량, 변동폭 등 과거 주식 상세 정보 제공.
  
![image](https://github.com/user-attachments/assets/06ac5e84-06a3-4211-abf8-4eabb5e8c5bd)

![image](https://github.com/user-attachments/assets/a81bff13-46ae-4e08-9073-598214fc119f)

- **GPT 분석**: 주식 세부 정보와 관련 뉴스를 기반으로 GPT가 분석한 결과 제공.

- **로켓 발사**: 특정 시점에 대한 사용자 의견을 기록하고 저장 가능. 주가 정보와 함께 의견을 시각적으로 표시.
![image](https://github.com/user-attachments/assets/dc2c9213-d753-410d-a68a-c1a08ed7e5a6)

![image](https://github.com/user-attachments/assets/448e1842-32cb-4c2b-8710-75271ee55ec0)

### 2. 플래닛 트렌드 (메인 화면)
- **행성 클러스터**: 키워드 분석을 통해 주식들의 언급 빈도를 시각적으로 표현. 필요시 워드 클라우드로 대체 가능.


- **실시간 주식 정보**: 실시간으로 모든 주식의 정보를 제공.

### 3. 마이페이지 / 관심 행성
- **내 정보 조회 및 수정**: 사용자 정보 관리.
- **관심 행성 등록**: 관심 있는 주식을 행성계로 표현하여 관리.
  
![image](https://github.com/user-attachments/assets/d12b3db6-35a1-450d-8961-9e4479eec77c)

## 모니터링
![정리](https://github.com/user-attachments/assets/223a627e-cce3-43b8-a125-c431a612a6d6)
![image (3)](https://github.com/user-attachments/assets/608ef71b-5833-45df-b204-eacd13697b09)
![image (5)](https://github.com/user-attachments/assets/0887c474-2da6-44f2-9aae-0562155ebd19)


## 기술 스택

- **Frontend**: [![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org) [![Three.js](https://img.shields.io/badge/Three.js-000000?style=flat&logo=three.js&logoColor=white)](https://threejs.org)
- **Backend**: [![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot) [![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white)](https://redis.io) [![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)](https://www.mysql.com)
- **Database**: [![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)](https://www.mysql.com) [![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)](https://www.mongodb.com)
- **Big Data**: [![Spark](https://img.shields.io/badge/Apache%20Spark-E25A1C?style=flat&logo=apache-spark&logoColor=white)](https://spark.apache.org) [![Hadoop](https://img.shields.io/badge/Apache%20Hadoop-66CCFF?style=flat&logo=apache-hadoop&logoColor=white)](https://hadoop.apache.org) [![Kafka](https://img.shields.io/badge/Apache%20Kafka-231F20?style=flat&logo=apache-kafka&logoColor=white)](https://kafka.apache.org)
- **Infrastructure**: [![Kubernetes](https://img.shields.io/badge/Kubernetes-326CE5?style=flat&logo=kubernetes&logoColor=white)](https://kubernetes.io) [![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com) [![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=flat&logo=jenkins&logoColor=white)](https://www.jenkins.io) [![ArgoCD](https://img.shields.io/badge/ArgoCD-0091E2?style=flat&logo=argo&logoColor=white)](https://argoproj.github.io)
- **External APIs**: [![한국투자증권 API](https://img.shields.io/badge/한국투자증권_API-blue)](https://api.koreainvestment.com) [![Clova](https://img.shields.io/badge/Clova-52C41A?style=flat&logo=naver&logoColor=white)](https://www.ncloud.com/product/aiService/clova) [![GPT API](https://img.shields.io/badge/GPT_API-FF9900?style=flat&logo=openai&logoColor=white)](https://openai.com)


## 설치 및 실행 방법

### 프론트엔드: Next.js 설치 후 실행
```bash
pnpm install
pnpm dev
```

### 백엔드: Spring Boot 프로젝트 실행
```bash
./mvnw spring-boot:run
```

### Kubernetes 클러스터
Jenkins와 ArgoCD를 통한 배포 자동화.



## ERD 및 API 명세서

- **ERD**: 주식 관련 데이터 및 사용자 정보를 효과적으로 관리하기 위해 MySQL을 기반으로 설계되었습니다.
![image](https://hackmd.io/_uploads/SkCd6EIy1x.png)

- **API 명세서**: REST API로 주식 데이터 및 뉴스 정보를 제공하며, GPT 분석 결과도 API로 연결되어 있습니다.


## 프로젝트 산출물
- [요구사항 정의서](https://codingteststudy.notion.site/1-11c5e78bfb2e8014bceed79cf345fa9c?pvs=4)
- [ERD](https://codingteststudy.notion.site/ERD-1-11c5e78bfb2e80b99ea3d8f49eec493d?pvs=4)
- [API 명세서](https://codingteststudy.notion.site/API-1-11c5e78bfb2e80749541d75029ae2239?pvs=4)
- [기능 명세서](https://codingteststudy.notion.site/1-11c5e78bfb2e8055a293cead373efd75?pvs=4)
- [빅데이터 분산 설계](https://codingteststudy.notion.site/1-11c5e78bfb2e8070ad81eea0c7da768a?pvs=4)
- [프론트엔드 설계](https://codingteststudy.notion.site/1-11c5e78bfb2e8059869bf11783070706?pvs=4)
- [포팅 매뉴얼](https://codingteststudy.notion.site/1-11c5e78bfb2e809abac1c3279f3c7734?pvs=4)
- [간트 차트](https://zenith-sloth-0ff.notion.site/f4cfb300a9ce44b8972df786e840571f?v=5ca4a3b6151f477d865ceb0aaffd9c34&pvs=4)



## 팀원 정보

#### Frontend  : [![정희수](https://img.shields.io/badge/-정희수-blueviolet?style=for-the-badge&logo=github&logoColor=white)](https://github.com/jungheesu) [![이상현](https://img.shields.io/badge/-이상현-blueviolet?style=for-the-badge&logo=github&logoColor=white)](https://github.com/sanghyun)  [![차민주](https://img.shields.io/badge/-차민주-blueviolet?style=for-the-badge&logo=github&logoColor=white)](https://github.com/minju)

#### Backend : [![선예림](https://img.shields.io/badge/-선예림-green?style=for-the-badge&logo=github&logoColor=white)](https://github.com/yerimseon)  [![박지훈](https://img.shields.io/badge/-박지훈-green?style=for-the-badge&logo=github&logoColor=white)](https://github.com/jihunpark)  [![손배준](https://img.shields.io/badge/-손배준-green?style=for-the-badge&logo=github&logoColor=white)](https://github.com/baejoon)

