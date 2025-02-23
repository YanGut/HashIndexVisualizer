export default function storeDisk(words: string[], pageSize: number): Record<number, string[]> {
  const disk: Record<number, string[]> = {};

  let currentPage = 1;
  let currentWords: string[] = [];
  for (let i = 0; i < words.length; i++) {
    if (currentWords.length === pageSize) {
      disk[currentPage] = currentWords;
      currentPage++;
      currentWords = [];

      console.log(`Encheu a pagina ${currentPage}`);
    }

    currentWords.push(words[i]);
  }

  
  if (currentWords.length > 0) {
    disk[currentPage] = currentWords;
  }
  
  return disk;
}