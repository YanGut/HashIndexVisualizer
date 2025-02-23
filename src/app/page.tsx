'use client'

import { useEffect, useState } from "react";

import PageSizeInput from "@/components/PageSizeInput";
import SearchWordInput from "@/components/SearchBar";

export default function Home() {
  const [pageSize, setPageSize] = useState<number>(0);
  const [searchWord, setSearchWord] = useState<string>("");
  const [isShowingTableScanButton, setIsShowingTableScanButton] = useState<boolean>(false);

  useEffect(() => {
    if (pageSize > 0 && searchWord.length > 0) {
      setIsShowingTableScanButton(true);
    } else {
      setIsShowingTableScanButton(false);
    }
  }, [pageSize, searchWord]);

  return (
    <main className="flex flex-col items-center justify-center gap-4 h-screen">
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
    </main>
  );
}