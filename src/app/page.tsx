'use client'

import { useEffect, useState } from "react";

import PageSizeInput from "@/components/PageSizeInput";
import SearchWordInput from "@/components/SearchBar";
import InsertWords from "@/components/InsertWords";

import storeDisk from "@/service/storage";

export default function Home() {
  const [pageSize, setPageSize] = useState<number>(1000);
  const [words, setWords] = useState<string[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");
  const [isShowingTableScanButton, setIsShowingTableScanButton] = useState<boolean>(false);
  const [disk, setDisk] = useState<Record<number, string[]>>({});

  useEffect(() => {
    if (pageSize > 0 && searchWord.length > 0 && words.length > 0) {
      setIsShowingTableScanButton(true);
    } else {
      setIsShowingTableScanButton(false);
    }
  }, [pageSize, searchWord]);

  useEffect(() => {

    console.log("startou a funcao");
    setDisk(storeDisk(words, pageSize));
    console.log("terminou a funcao");

  }, [words, pageSize]);

  console.log(disk);

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