export interface News {
    id: number;
    title: string;
    content: string;
    writeDate: string;
    newspaper: string;
    img: string;
  }
  


export interface NewsDetail {
  news: News;
  keywords: string[];
}