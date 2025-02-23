export interface PageSizeInputProps {
  setWords: (words: string[]) => void;
}

export default function InsertWords({ setWords }: PageSizeInputProps) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      const wordsArray = text.split("\n").map(word => word.trim()).filter(word => word.length > 0);
      setWords(wordsArray);
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="search-word" className="text-lg font-medium text-gray-700">
        Insira as palavras:
      </label>
      <input type="file" accept=".txt" onChange={handleFileUpload} />
    </div>
  );
}