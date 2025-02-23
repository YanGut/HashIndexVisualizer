import { useState } from "react";
import SearchIcon from "../assets/icons/SearchIcon";
import { on } from "events";
interface SearchWordInputProps {
  setSearchWord: (word: string) => void;
}

export default function SearchWordInput({ setSearchWord }: SearchWordInputProps) {
  const [word, setWord] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setWord(value);
    setSearchWord(value);
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
      </div>
    </div>
  );
}