import { Page } from "@/types/Page";
import { Bucket } from "@/types/Bucket";
import { BucketItem } from "@/types/BucketItem";
import { BucketList } from "@/types/BucketList";

import { hashFunction } from "./hash";

export function storeDisk(words: string[], pageSize: number): Page[] {
  const disk: Page[] = [];
  let currentPage = 1;
  let currentWords: string[] = [];

  for (let i = 0; i < words.length; i++) {
    if (currentWords.length === pageSize) {
      disk.push({ id: currentPage, words: currentWords });
      currentPage++;
      currentWords = [];

      console.log(`Encheu a pagina ${currentPage}`);
    }

    currentWords.push(words[i]);
  }

  if (currentWords.length > 0) {
    disk.push({ id: currentPage, words: currentWords });
  }

  return disk;
}

export function storeBucket(pageList: Page[], bucketSize: number, bucketListSize: number): BucketList {
  const bucketList = new BucketList(bucketListSize, bucketSize);

  pageList.forEach((page) => {
    const pageId = page.id;

    page.words.forEach((word) => {
      const index = hashFunction(word, bucketListSize);

      const bucket = bucketList.buckets[index];

      const bucketItem = new BucketItem(pageId, word);

      bucket.insert(bucketItem);
    });
  });

  return bucketList;
}