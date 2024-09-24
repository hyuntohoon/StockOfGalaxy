export interface News {
    id: number;
    title: string;
    content: string;
    write_date: string;
    신문사: string;
    img: string;
  }
  

export interface NewsDetail {
  news: News;
  keywords: string[];
}