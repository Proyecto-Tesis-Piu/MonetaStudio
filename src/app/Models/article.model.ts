export interface Article {
    id: string;
    shortText: string;
    title: string;
    text: string;
    date: string;
    author: string;
    image: string;
    tags: string[];
    bibliography: Bibliography[];
    caption?: string;
  }
  
export interface Bibliography {
  text: string;
  url?: string;
}