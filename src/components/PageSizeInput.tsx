import { useState } from "react";

interface PageSizeInputProps {
  setPageSize: (size: number) => void;
}

export default function PageSizeInput({ setPageSize }: PageSizeInputProps) {
  const [size, setSize] = useState<number>(100);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = parseInt(event.target.value);

    if (value) {
      let numericValue: number = 0;

      if (value < 100) {
        numericValue = 100;
        alert("O tamanho da página deve ser maior ou igual a 1000");
        return;
      }

      numericValue = value;
      setSize(numericValue);
      setPageSize(numericValue);
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
          value={size < 1000 ? 1000 : size}
          onChange={(event) => handleChange(event)}
          className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="Ex: 100"
        />
      </div>
    </div>
  );
}