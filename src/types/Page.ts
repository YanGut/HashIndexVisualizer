export class Page {
  id: number;
  words: string[];

  constructor(id: number, words: string[]) {
    this.id = id;
    this.words = words;
  }
}