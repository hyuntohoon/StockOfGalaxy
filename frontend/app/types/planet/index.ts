export interface News {
    newsId: number,
    title: string,
    content ?: string,
    publishedDate: string,
    thumbnailImg: string
}

export interface NewsDetail {
    newsId: number,
    title: string,
    sentences: string[],
    category: string,
    publishedDate: string,
    newsLink: string,
    sentimentIndex: number,
    thumbnailImg: string,
    newsCreatedAt: string,
    newsUpdatedAt: string,
    keywords: string[];       // 뉴스와 관련된 키워드 리스트
}

  

export interface Stock {
    stockCode: string, 
    companyName: string, 
    companyDescription: string, 
    establishedYear: number,
    ceo: string,
    webSite: string,
    fiscalMonth: number,
    delisted: boolean
}