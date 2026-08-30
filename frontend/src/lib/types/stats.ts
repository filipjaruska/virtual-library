export interface TagCount {
  tag: string;
  count: number;
}

export interface MonthlyPoint {
  month: string;
  books: number;
  comments: number;
}

export interface LibraryStats {
  totalBooks: number;
  totalComments: number;
  uniqueAuthors: number;
  uniqueTags: number;
  /** Oldest and newest publication year in the collection. */
  yearRange: { from: number; to: number };
  tagDistribution: TagCount[];
  monthly: MonthlyPoint[];
}
