package com.sog.news.global;

public enum NewsCategory {
    정치("POLITICS"),
    경제("ECONOMY"),
    사회("SOCIETY"),
    기술("TECH"),
    스포츠("SPORTS"),
    연예("ENTERTAIN"),
    세계("WORLD"),
    날씨("WEATHER"),
    건강("HEALTH"),
    생활("LIFE"),
    기타("OTHER");

    private final String englishName;

    NewsCategory(String englishName) {
        this.englishName = englishName;
    }

    public String getEnglishName() {
        return englishName;
    }
}