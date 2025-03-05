import { BucketItem } from "./BucketItem";

export class Bucket {
  bucketSize: number;
  bucketLines: BucketItem[];
  overflow: boolean = false;
  bucketOverflow: Bucket | null = null;

  constructor(bucketSize: number) {
    this.bucketSize = bucketSize;
    this.bucketLines = [];
  }

  insert(item: BucketItem): void {
    if (this.bucketLines.length < this.bucketSize) {
      this.bucketLines.push(item);
    } else {
      if (!this.overflow) {
        this.overflow = true;
        this.bucketOverflow = new Bucket(this.bucketSize);
      }
      this.bucketOverflow?.insert(item);
    }
  }

  search(word: string): BucketItem | null {
    const item = this.bucketLines.find((item) => item.word === word);
    if (item) {
      return item;
    } else {
      return this.bucketOverflow?.search(word) ? this.bucketOverflow.search(word) : null;
    }
  }

  getQuantityRegisters(): number{
    if (this.overflow && this.bucketOverflow) {
      return this.bucketSize + this.bucketOverflow?.getQuantityRegisters();
    }

    return this.bucketLines.length;
  }

  getQuantityOverflows(): number {
    if (this.overflow && this.bucketOverflow) {
      return 1 + this.bucketOverflow.getQuantityOverflows();
    }

    return this.overflow ? 1 : 0;
  }
}