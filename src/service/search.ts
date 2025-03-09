import { BucketList } from "@/types/BucketList";
import { Page } from "@/types/Page";
import { SearchResult } from "@/types/SearchResult";
import { TableScanResult } from "@/types/TableScanResult";

import { hashFunction } from "./hash";

export function tableScanner(searchWord: string, disk: Page[]): TableScanResult | null {

  let contador = 0;

  for (let i = 0; i < disk.length; i++) {
    const { words, id } = disk[i];

    contador++;

    const word = words.find((word) => word === searchWord);

    if (word) {
      return {
        word: word,
        pageNumber: id,
        pagesScanned: contador,
        found: true
      };
    }
  }

  return {
    word: searchWord,
    pageNumber: 1,
    pagesScanned: contador,
    found: false
  };
}

export function searchByKey(searchWord: string, bucketList: BucketList, disk: Page[]): SearchResult | null {

  const index = hashFunction(searchWord, bucketList.size);
  const bucket = bucketList.buckets[index];

  const bucketItem = bucket.search(searchWord);

  if (bucketItem) {
    const page = disk[bucketItem.pageId - 1];

    const word = page.words.find((word) => word === searchWord);

    return {
      word: word ? word : "Palavra não encontrada",
      pageNumber: word ? bucketItem.pageId : 0,
      bucketIndex: index,
      found: word ? true : false
    };
  }

  return {
    word: "Palavra não encontrada",
    pageNumber: 0,
    found: false
  };
}