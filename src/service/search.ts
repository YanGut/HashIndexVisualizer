import { BucketList } from "@/types/BucketList";
import { Page } from "@/types/Page";
import { SearchResult } from "@/types/SearchResult";
import { TableScanResult } from "@/types/TableScanResult";

import { hashFunction } from "./hash";

export function tableScanner(searchWord: string, disk: Page[]): TableScanResult | null {

  for (let i = 0; i < disk.length; i++) {
    const { words, id } = disk[i];
  
    if (words.includes(searchWord)) {
      return {
        word: searchWord,
        pageNumber: id,
        pagesScanned: i + 1,
        found: true
      };
    }
  }

  return {
    word: searchWord,
    pageNumber: 1,
    pagesScanned: 1,
    found: false
  };
}

export function searchByKey(searchWord: string, bucketList: BucketList): SearchResult | null {
  
  const index = hashFunction(searchWord, bucketList.size);
  const bucket = bucketList.buckets[index];

  const bucketItem = bucket.search(searchWord);

  if (bucketItem) {
    return {
      word: searchWord,
      pageNumber: bucketItem.pageId,
      bucketIndex: index,
      found: true
    };
  }

  return {
    word: "Palavra não encontrada",
    pageNumber: 0,
    found: false
  };
}