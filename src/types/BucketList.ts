import { Bucket } from "./Bucket";
import { BucketItem } from "./BucketItem";

export class BucketList {
  size: number;
  buckets: Bucket[];

  constructor(size: number, bucketSize: number) {
    this.size = size;
    this.buckets = Array.from({ length: size }, (_, i) => new Bucket(bucketSize));
  }

  insert(bucket: Bucket): void {
    this.buckets.push(bucket);
  }

  search(index: number, word: string): string {
    const bucket = this.buckets[index];
    if (!bucket) return "Bucket não encontrado";

    const bucketItem: BucketItem | null = bucket.search(word);
    if (!bucketItem) return "Item não encontrado";

    return bucketItem.word;
  }
}