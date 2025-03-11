
import { useState } from "react";

export interface PageSizeInputProps {
  setWords: (words: string[]) => void;
  limparStates: () => void;
  pageSize: Number;
  bucketSize: Number;
}

export default function InsertWords({ setWords, limparStates, pageSize, bucketSize }: PageSizeInputProps) {

  const [botaoDisabled, setBotaoDisable] = useState<boolean>(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {

    if (validarTamanhos()) {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        const wordsArray = text.split("\n").map(word => word.trim()).filter(word => word.length > 0);
        setWords(wordsArray);
      };

      limparStates();

      reader.readAsText(file);
    } else {
      alert("O tamanho da página deve ser maior que 0");

    }
  };

  const validarTamanhos = () => {

    if (Number(bucketSize) <= 0 || Number(pageSize) <= 0) {
      return false;
    }
    return true;
  }

  return (
    <div className="flex flex-col gap-4 bg-gray-800 rounded-lg w-full max-w-md">

      <label className="text-lg font-semibold text-gray-100">Upload file</label>
      <input
        accept=".txt"
        onChange={handleFileUpload}
        className="file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer hover:file:bg-blue-700 transition-all rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file" />

    </div>

  );
}