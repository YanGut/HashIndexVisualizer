'use client'

import { useEffect, useState } from "react";

import PageSizeInput from "@/components/PageSizeInput";
import SearchWordInput from "@/components/SearchBar";
import InsertWords from "@/components/InsertWords";

import {storeDisk, storeBucket} from "@/service/storage";
import { calculateBucketListSize } from "@/service/calculateBucketListSize";
import { calculateCollisionRate, calcualteOverflowsRate } from "@/service/calculateMetrics";

import { Page } from "@/types/Page";
import { BucketList } from "@/types/BucketList";

export default function Home() {
  const [pageSize, setPageSize] = useState<number>(1000);
  const [words, setWords] = useState<string[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");
  const [isShowingTableScanButton, setIsShowingTableScanButton] = useState<boolean>(false);
  const [disk, setDisk] = useState<Page[]>([]);
  const [bucketListSize, setBucketListSize] = useState<number>(10);
  const [bucketSize, setBucketSize] = useState<number>(50);
  const [bucketList, setBucketList] = useState<BucketList>(new BucketList(bucketListSize, bucketSize));
  const [collisionRate, setCollisionRate] = useState<number>(0);
  const [overflowsRate, setOverflowsRate] = useState<number>(0);

  useEffect(() => {
    if (pageSize > 0 && searchWord.length > 0 && words.length > 0) {
      setIsShowingTableScanButton(true);
    } else {
      setIsShowingTableScanButton(false);
    }
  }, [pageSize, searchWord]);

  useEffect(() => {
    setDisk(storeDisk(words, pageSize));
  }, [words, pageSize]);

  useEffect(() => {
    setBucketListSize(calculateBucketListSize(words.length, bucketSize));
  }, [disk]);

  useEffect(() => {
    setBucketList(storeBucket(disk, bucketSize, bucketListSize));
  }, [bucketListSize]);

  useEffect(() => {
    setCollisionRate(calculateCollisionRate(bucketList, words.length));
    setOverflowsRate(calcualteOverflowsRate(bucketList));
  }, [bucketList]);

  console.log(`Colisões: ${collisionRate}%`);
  console.log(`Overflow: ${overflowsRate}%`);

  return (
    <main className="flex flex-row items-center justify-center gap-4 h-screen">
      <div className="flex flex-col items-center justify-center gap-4 h-screen">
        <div className="p-6 bg-white shadow-md rounded-lg">
          <PageSizeInput setPageSize={setPageSize} />
        </div>
        <div className="p-6 bg-white shadow-md rounded-lg">
          <SearchWordInput setSearchWord={setSearchWord} />
        </div>
        {isShowingTableScanButton && (
          <button className="px-4 py-2 text-white bg-blue-500 rounded-lg shadow-md" onClick={() => alert("Tabela escaneada!")}>
            Escanear tabela
          </button>
        )}
      </div>
      <div>
        <InsertWords setWords={setWords} />
      </div>
    </main>
  );
}