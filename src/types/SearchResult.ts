export class SearchResult {
  word: string;
  pageNumber: number;
  found: boolean;

  constructor(word: string, pageNumber: number, found: boolean) {
    this.word = word;
    this.pageNumber = pageNumber;
    this.found = found;
  }
}