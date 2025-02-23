'use client'

import { useState } from "react";

import PageSizeInput from "@/components/PageSizeInput";
import SearchWordInput from "@/components/SearchBar";

export default function Home() {
  const [pageSize, setPageSize] = useState<number>(0);
  const [isShowingTableScanButton, setIsShowingTableScanButton] = useState<boolean>(false);

  return (
    <main className="flex flex-col items-center justify-center gap-4 h-screen">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <PageSizeInput onChange={setPageSize} />
        {pageSize > 0 && (
          <p className="mt-4 text-gray-700">Tamanho escolhido: {pageSize}</p>
        )}
      </div>
      <div className="p-6 bg-white shadow-md rounded-lg">
        <SearchWordInput onChange={console.log} />
      </div>
    </main>
  );
}
