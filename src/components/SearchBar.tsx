import { useState } from "react";
import SearchIcon from "../assets/icons/SearchIcon";
interface SearchWordInputProps {
  onChange: (word: string) => void;
}

export default function SearchWordInput({ onChange }: SearchWordInputProps) {
  const [word, setWord] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setWord(value);
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="search-word" className="text-lg font-medium text-gray-700">
        Palavra a ser buscada:
      </label>
      <div className="flex flex-row gap-2">
        <input
          id="search-word"
          type="text"
          value={word}
          onChange={handleChange}
          className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          placeholder="Ex: 'lymphangioendothelioma'"
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium"
          onClick={() => onChange(word)}
        >
          <SearchIcon />
        </button>
      </div>
    </div>
  );
}