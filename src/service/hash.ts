export function hashFunction(word: string, bucketListSize: number): number {
  let hash: number = 60065;
  for (let i = 0; i < word.length; i++) {
    hash = ((hash << 5) + hash) + word.charCodeAt(i);
  }
  return Math.abs(hash % bucketListSize);
}