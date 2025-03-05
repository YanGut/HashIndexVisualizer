export function calculateBucketListSize(registersSize: number, bucketSize: number): number {
  return  Math.ceil(registersSize / bucketSize);
}