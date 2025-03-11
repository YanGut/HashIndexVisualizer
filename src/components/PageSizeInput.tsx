import { useState } from "react";

interface PageSizeInputProps {
  setPageSize: (size: number) => void;
  setBucketSize: (size: number) => void;
  bucketSize: (Number);
}

export default function PageSizeInput({ setPageSize, setBucketSize, bucketSize }: PageSizeInputProps) {
  const [size, setSize] = useState<number>(1500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(event.target.value);

    if (value) {
      setSize(value);
      setPageSize(value);
    } else {
      setSize(0);
      setPageSize(0);
    }
  };

  const handleChangeBucketSize = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(event.target.value);

    if (value) {

      setBucketSize(value);
    } else {
      setBucketSize(0);

    }
    
  }

  return (
    <div className="flex gap-7 flex-row">
      <div className="flex flex-col gap-2 col-4">
        <label htmlFor="page-size" className="text-lg font-medium text-white">
          Tamanho da Página:
        </label>
        <div className="flex flex-row gap-2">
          <input
            id="page-size"
            type="text"
            value={size}
            onChange={(event) => handleChange(event)}
            className="w-32 px-3 py-2 border border-gray-600 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            placeholder="Ex: 100"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 col-4 ">
        <label htmlFor="page-size" className="text-lg font-medium text-white">
          Tamanho do Bucket:
        </label>
        <div className="flex flex-row gap-2">
          <input
            id="page-size"
            type="text"
            value={String(bucketSize)}
            onChange={(event) => handleChangeBucketSize(event)}
            className="w-32 px-3 py-2 border border-gray-600 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            placeholder="Ex: 100"
          />
        </div>
      </div>

    </div>


  );
}