export function hashFunction(word: string, bucketListSize: number): number {
  let hash = 5381; // Usando o algoritmo DJB2, que tem boa distribuição
    
  for (let i = 0; i < word.length; i++) {
      hash = (hash * 33) ^ word.charCodeAt(i);
  }
  
  return Math.abs(hash) % bucketListSize;
}