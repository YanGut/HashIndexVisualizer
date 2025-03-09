export class TableScanResult {
  word: string;
  pageNumber: number;
  pagesScanned: number;
  found: boolean;

  constructor(word: string, pageNumber: number, pagesScanned: number, found: boolean) {
    this.word = word;
    this.pageNumber = pageNumber;
    this.pagesScanned = pagesScanned;
    this.found = found;
  }
}