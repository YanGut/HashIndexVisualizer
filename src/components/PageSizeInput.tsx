import { useState } from "react";

interface PageSizeInputProps {
  setPageSize: (size: number) => void;
}

export default function PageSizeInput({ setPageSize }: PageSizeInputProps) {
  const [size, setSize] = useState<number>(1500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(event.target.value);

    if (value) {
      let numericValue: number = 0;
      if (value < 0) {
        numericValue = 0;
        alert("O tamanho da página deve ser maior que 0");
        return;
      };

      numericValue = value;
      setSize(numericValue);
      setPageSize(numericValue);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="page-size" className="text-lg font-medium text-white">
        Tamanho da Página:
      </label>
      <div className="flex flex-row gap-2">
        <input
          id="page-size"
          type="text"
          min="1"
          value={size}
          onChange={(event) => handleChange(event)}
          className="w-32 px-3 py-2 border border-gray-600 bg-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
          placeholder="Ex: 100"
        />
      </div>
    </div>

  );
}