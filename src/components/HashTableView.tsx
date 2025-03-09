import { useState } from "react";
import { BucketList } from "@/types/BucketList";
import { BucketItem } from "@/types/BucketItem";
import { Bucket } from "@/types/Bucket";

import { hashFunction } from "@/service/hash";

interface HashTableViewProps {
  bucketList: BucketList;
  selectedWord?: string;
  highlightedBucket?: number;
}

export default function HashTableView({ bucketList, selectedWord }: HashTableViewProps) {
  const [expandedBucket, setExpandedBucket] = useState<number | null>(null);

  // Function to render bucket items (either main or overflow items)
  const renderBucketItems = (items: BucketItem[], isOverflow: boolean = false) => {
    return (
      <>
        <p className="text-xs font-semibold mb-1 mt-2">
          {isOverflow ? <span className="text-orange-600">Overflow Items:</span> : 'Items:'}
        </p>
        <ul className="text-xs space-y-1 max-h-40 overflow-y-auto">
          {items.map((item, idx) => (
            <li
              key={idx}
              className={`p-1 rounded ${
                selectedWord === item.word ? 'bg-yellow-100 text-black' : ''
              }`}
            >
              <span className="font-medium">{item.word}</span> → Página {item.pageId}
            </li>
          ))}
        </ul>
      </>
    );
  };

  // Function to recursively render overflow buckets
  const renderOverflowBuckets = (bucket: Bucket, depth: number = 0) => {
    if (!bucket.bucketOverflow) return null;
    
    return (
      <div className="ml-4 border-l-2 border-orange-300 pl-2 mt-2">
        <p className="text-xs text-orange-600 font-semibold">
          Overflow Bucket (Level {depth + 1}):
        </p>
        {renderBucketItems(bucket.bucketOverflow.bucketLines)}
        {bucket.bucketOverflow.overflow && renderOverflowBuckets(bucket.bucketOverflow, depth + 1)}
      </div>
    );
  };
  
  // Find bucket that would contain the selected key (this should match your hash function implementation)
  const getHighlightedBucket = () => {
    if (!selectedWord || bucketList.buckets.length === 0) return null;
    return hashFunction(selectedWord, bucketList.size);
  };
  
  const highlightedBucket = getHighlightedBucket();
  
  return (
    <div className="overflow-auto max-h-96">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {bucketList.buckets.map((bucket, index) => (
          <div
          key={index}
          className={`p-3 rounded-lg cursor-pointer border-2 transition-colors self-start ${
            highlightedBucket === index
              ? 'border-red-500'
              : 'border-gray-200 hover:border-blue-300'
          }`}
          onClick={() => setExpandedBucket(expandedBucket === index ? null : index)}
        >
        
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Bucket {index}</h3>
              <span className="text-sm bg-gray-600 px-2 py-1 rounded">
                {bucket.bucketLines.length.toLocaleString("pt-BR")}/{bucket.bucketSize.toLocaleString("pt-BR")}
                {bucket.overflow && (
                  <span className="text-red-500 ml-1">+{
                    // Count all overflow items across all overflow buckets
                    (() => {
                      let count = 0;
                      let currentBucket = bucket.bucketOverflow;
                      while (currentBucket) {
                        count += currentBucket.bucketLines.length;
                        currentBucket = currentBucket.bucketOverflow;
                      }
                      return count;
                    })()
                  }</span>
                )}
              </span>
            </div>

            {expandedBucket === index && (
              <div className="mt-2">
                {bucket.bucketLines.length > 0 && renderBucketItems(bucket.bucketLines)}
                
                {bucket.overflow && bucket.bucketOverflow && 
                  renderOverflowBuckets(bucket)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}