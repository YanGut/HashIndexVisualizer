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
    onChange(value === "" ? 0 : Number(value));
  }; 

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="page-size" className="text-lg font-medium text-gray-700">
        Tamanho da Página:
      </label>
      <input
        id="page-size"
        type="number"
        min="1"
        value={size}
        onChange={handleChange}
        className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        placeholder="Ex: 100"
      />
    </div>
  );
}
