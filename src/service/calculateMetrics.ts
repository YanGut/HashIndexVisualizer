import { BucketList } from "@/types/BucketList";

export function calculateCollisionRate(bucketList: BucketList, registerQuantity: number): number {
  let collisionCount: number = 0;

  bucketList.buckets.forEach((bucket) => {
    if (bucket.overflow && bucket.bucketOverflow) {
      collisionCount += bucket.bucketOverflow.getQuantityRegisters();
    }
  });

  return (collisionCount / registerQuantity) * 100;
}

export function calcualteOverflowsRate(bucketList: BucketList): number {
  let overflowsCount: number = 0;

  bucketList.buckets.forEach((bucket) => {
    overflowsCount += bucket.getQuantityOverflows();
  });

  return (overflowsCount / bucketList.size) * 100;
}