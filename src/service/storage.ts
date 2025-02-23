import { Page } from "@/types/Page";

export default function storeDisk(words: string[], pageSize: number): Page[] {
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