import { BucketList } from "@/types/BucketList";
import { Page } from "@/types/Page";
import { SearchResult } from "@/types/SearchResult";
import { TableScanResult } from "@/types/TableScanResult";

export function tableScanner(searchWord: string, disk: Page[]): TableScanResult | null {
  return {
    word: "word",
    pageNumber: 1,
    pagesScanned: 1
  };
}

export function searchByKey(searchWord: string, bucketList: BucketList, disk: Page[]): SearchResult | null {
  return {
    word: "word",
    pageNumber: 1,
    found: true
  };
}