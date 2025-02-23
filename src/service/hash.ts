export function hashFunction(word: string, bucketSize: number): number {
  let hash = 0;
  for (let i = 0; i < word.length; i++) {
    hash = (hash * 3 + word.charCodeAt(i)) % bucketSize;
  }
  return hash;
}