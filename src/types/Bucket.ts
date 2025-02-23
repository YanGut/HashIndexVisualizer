export class Bucket {
  id: number;
  words: Map<string, number>;

  constructor(id: number) {
    this.id = id;
    this.words = new Map();
  }

  addWord(word: string, pageId: number) {
    this.words.set(word, pageId);
  }
}