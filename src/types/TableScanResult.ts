export class TableScanResult {
  word: string;
  pageNumber: number;
  pagesScanned: number;

  constructor(word: string, pageNumber: number, pagesScanned: number) {
    this.word = word;
    this.pageNumber = pageNumber;
    this.pagesScanned = pagesScanned;
  }
}