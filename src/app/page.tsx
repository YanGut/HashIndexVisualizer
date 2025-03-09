'use client'

import { useEffect, useState } from "react";
import PageSizeInput from "@/components/PageSizeInput";
import SearchBar from "@/components/SearchBar";
import InsertWords from "@/components/InsertWords";
import HashTableView from "@/components/HashTableView";
import PageView from "@/components/PageView";
import StatsPanel from "@/components/StatsPanel";

import { storeDisk, storeBucket } from "@/service/storage";
import { calculateBucketListSize } from "@/service/calculateBucketListSize";
import { calculateCollisionRate, calcualteOverflowsRate } from "@/service/calculateMetrics";
import { searchByKey, tableScanner } from "@/service/search";

import { Page } from "@/types/Page";
import { BucketList } from "@/types/BucketList";
import { SearchResult } from "@/types/SearchResult";
import { TableScanResult } from "@/types/TableScanResult";

export default function Home() {
  const [pageSize, setPageSize] = useState<number>(1500);
  const [words, setWords] = useState<string[]>([]);
  const [searchWord, setSearchWord] = useState<string>("");
  const [disk, setDisk] = useState<Page[]>([]);

  const [bucketSize, setBucketSize] = useState<number>(100);
  const [bucketListSize, setBucketListSize] = useState<number>(1);
  const [bucketList, setBucketList] = useState<BucketList>(new BucketList(bucketListSize, bucketSize));

  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [scanResult, setScanResult] = useState<TableScanResult | null>(null);

  const [collisionRate, setCollisionRate] = useState<number>(0);
  const [overflowsRate, setOverflowsRate] = useState<number>(0);
  const [searchCost, setSearchCost] = useState<number>(0);
  const [scanCost, setScanCost] = useState<number>(0);
  const [searchTime, setSearchTime] = useState<number>(0);
  const [scanTime, setScanTime] = useState<number>(0);
  const [timeDifference, setTimeDifference] = useState<number>(0);

  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [selectedPageIndex, setSelectedPageIndex] = useState<number | null>(null);

  // Generate pages when words or page size changes
  useEffect(() => {
    const generatedDisk = storeDisk(words, pageSize);
    setDisk(generatedDisk);
    setIsDataLoaded(true);
  }, [words]);

  useEffect(() => {
    const calculatedSize = calculateBucketListSize(words.length, bucketSize);
    setBucketListSize(calculatedSize);
  }, [disk]);

  useEffect(() => {
    const generatedBucketList = storeBucket(disk, bucketSize, bucketListSize);
    setBucketList(generatedBucketList);
  }, [bucketListSize]);

  useEffect(() => {
    if (!bucketList || !words) return;
    setCollisionRate(calculateCollisionRate(bucketList, words.length));
    setOverflowsRate(calcualteOverflowsRate(bucketList));
  }, [bucketList]);

  // Handle search operation
  const handleSearch = () => {
    if (!searchWord.trim() || !isDataLoaded) return;

    // Search using hash index
    const startIndexTime = performance.now();
    const indexResult = searchByKey(searchWord, bucketList, disk);
    const endIndexTime = performance.now();
    const indexTime = endIndexTime - startIndexTime;

    setSearchResult(indexResult);
    setSearchTime(indexTime);

    if (!indexResult) return;
    setSearchCost(indexResult.found ? 1 : 0); // Simplified cost model

    if (!indexResult.found) return;
    setSelectedPageIndex(indexResult.pageNumber - 1);
  };

  // Handle table scan operation
  const handleTableScan = () => {
    if (!searchWord.trim() || !isDataLoaded) return;

    // Perform table scan
    const startScanTime = performance.now();
    const scanRes = tableScanner(searchWord, disk);
    const endScanTime = performance.now();
    const scanTimeResult = endScanTime - startScanTime;

    setScanTime(scanTimeResult);
    setTimeDifference(scanTimeResult - searchTime);

    if (!scanRes) return;
    setScanResult(scanRes);
    setScanCost(scanRes.pagesScanned);
  };

  return (
    <main className="min-h-screen p-6 bg-gray-900 text-gray-200">
      <h1 className="text-3xl font-bold text-center mb-8">Índice Hash Estático</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Configuration Panel */}
        <div className="lg:col-span-1 bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Configuração</h2>
          <div className="space-y-6">
            <PageSizeInput setPageSize={setPageSize} />
            <InsertWords setWords={setWords} />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-700 p-3 rounded-lg">
                <p className="text-sm text-gray-300">Total de Palavras</p>
                <p className="text-lg font-bold">{words.length.toLocaleString("pt-BR")}</p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg">
                <p className="text-sm text-gray-300">Total de Páginas</p>
                <p className="text-lg font-bold">{disk.length.toLocaleString("pt-BR")}</p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg">
                <p className="text-sm text-gray-300">Tamanho do Bucket</p>
                <p className="text-lg font-bold">{bucketSize.toLocaleString("pt-BR")}</p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg">
                <p className="text-sm text-gray-300">Número de Buckets</p>
                <p className="text-lg font-bold">{bucketListSize.toLocaleString("pt-BR")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search Panel */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Busca</h2>
          <div className="flex flex-col space-y-4">
            <SearchBar searchWord={searchWord} setSearchWord={setSearchWord} onSearch={handleSearch} isDisabled={!isDataLoaded} />

            <div className="flex space-x-4">
              <button
                className="px-4 py-2 text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex-1"
                onClick={handleSearch}
                disabled={!isDataLoaded || !searchWord.trim()}
              >
                Buscar com Índice
              </button>

              <button
                className="px-4 py-2 text-white bg-green-500 rounded-lg shadow-md hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex-1"
                onClick={handleTableScan}
                disabled={!isDataLoaded || !searchWord.trim()}
              >
                Table Scan
              </button>
            </div>

            {/* Search Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
              {searchResult && (
                <div className="p-4 bg-gray-700 rounded-lg border border-gray-600">
                  <h3 className="font-medium text-blue-400">Resultado com Índice:</h3>
                  <p className="mt-2">
                    {searchResult.found
                      ? `Palavra "${searchResult.word}" encontrada na página ${searchResult.pageNumber.toLocaleString("pt-BR")}`
                      : `Palavra "${searchWord}" não encontrada usando índice`}
                  </p>
                  <p className="mt-2">
                    {searchResult.found
                      ? `Palavra encontrada no Bucket ${searchResult.bucketIndex?.toLocaleString("pt-BR")}`
                      : `Palavra não encontrada no Bucket`}
                  </p>
                  <p className="mt-1 text-sm text-gray-400">Custo: {searchCost} acesso(s) a disco</p>
                  <p className="text-sm text-gray-400">Tempo: {searchTime.toFixed(2)}ms</p>
                </div>
              )}

              {scanResult && (
                <div className="p-4 bg-gray-700 rounded-lg border border-gray-600">
                  <h3 className="font-medium text-green-400">Resultado com Table Scan:</h3>
                  <p className="mt-2">
                    {scanResult.found
                      ? `Palavra "${scanResult.word}" encontrada na página ${scanResult.pageNumber.toLocaleString("pt-BR")} após escanear ${scanResult.pagesScanned.toLocaleString("pt-BR")} página(s)`
                      : `Palavra "${searchWord}" não encontrada após escanear todas as páginas`}
                  </p>
                  <p className="mt-1 text-sm text-gray-400">Custo: {scanCost.toLocaleString("pt-BR")} acesso(s) a disco</p>
                  <p className="text-sm text-gray-400">Tempo: {scanTime.toFixed(2)}ms</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1 bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Estatísticas</h2>
          <StatsPanel
            collisionRate={collisionRate ? collisionRate : 0}
            overflowsRate={overflowsRate ? overflowsRate : 0}
            searchCost={searchCost}
            scanCost={scanCost}
            timeDifference={timeDifference}
          />
        </div>

        {/* Hash Table Visualization */}
        <div className="lg:col-span-2 bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Visualização da Tabela Hash</h2>
          <HashTableView
            bucketList={bucketList}
            selectedWord={searchWord}
          />
        </div>
      </div>

      {/* Page View */}
      <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Visualização de Páginas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {disk.length > 0 && (
            <>
              <PageView
                page={disk[0]}
                pageNumber={1}
                title="Primeira Página"
              />

              {selectedPageIndex !== null ? (
                <PageView
                  page={disk[selectedPageIndex]}
                  pageNumber={selectedPageIndex + 1}
                  title="Página Encontrada"
                  highlightWord={searchWord}
                />
              ) : (
                disk.length > 1 && (
                  <PageView
                    page={disk[disk.length - 1]}
                    pageNumber={disk.length}
                    title="Última Página"
                  />
                )
              )}
            </>
          )}
        </div>
      </div>
    </main>

  );
}