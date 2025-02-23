import { useState } from "react";

interface PageSizeInputProps {
  onChange: (size: number) => void;
}

export default function PageSizeInput({ onChange }: PageSizeInputProps) {
  const [size, setSize] = useState<number | "">("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "" || (!isNaN(Number(value)) && Number(value) > 0)) {
      setSize(value === "" ? "" : Number(value));
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="page-size" className="text-lg font-medium text-gray-700">
        Tamanho da Página:
      </label>
      <div className="flex flex-row gap-2">
        <input
          id="page-size"
          type="number"
          min="1"
          value={size}
          onChange={handleChange}
          className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="Ex: 100"
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium"
          onClick={() => onChange(size === "" ? 0 : Number(size))}
        >
          OK
        </button>
      </div>
    </div>
  );
}
