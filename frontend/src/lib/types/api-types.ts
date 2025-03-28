import { Book } from "./books";

export interface StatsResponse {
  total: number;
}

export interface ChartDataItem {
  month: string;
  books: number;
  comments: number;
}

export interface TagDataItem {
  browser: string;
  visitors: number;
  fill: string;
}

export interface TagsResponse {
  total: number;
  tagCounts: Record<string, number>;
  chartData: TagDataItem[];
}

export interface BookData extends Omit<Book, "image" | "tags" | "comments"> {
  image?: {
    url: string;
    alternativeText?: string;
    formats?: Record<string, any>;
  };
  tags?: Array<{ name: string }>;
  comments?: Array<{
    id: number;
    content: string;
    createdAt: string;
    user?: {
      id: number;
      username: string;
    };
  }>;
  links?: Array<{
    text: string;
    url: string;
  }>;
}
