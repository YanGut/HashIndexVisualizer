export class SearchResult {
  word: string;
  pageNumber: number;
  bucketIndex?: number;
  found: boolean;

  constructor(word: string, pageNumber: number, found: boolean, bucketIndex?: number) {
    this.word = word;
    this.pageNumber = pageNumber;
    this.found = found;
    this.bucketIndex = bucketIndex;
  }
}