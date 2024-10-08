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
    content: string,
    category: string,
    publishedDate: string,
    newsLink: string,
    sentimentIndex: number,
    thumbnailImg: string,
    newsCreatedAt: string,
    newsUpdatedAt: string
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