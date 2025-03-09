import { ChangeEvent, useEffect, useState } from "react";
import SearchIcon from "@/assets/icons/SearchIcon";

interface SearchBarProps {
  searchWord: string;
  setSearchWord: (word: string) => void;
  onSearch?: (word: string) => void;
  isDisabled?: boolean;
}

export default function SearchBar({ 
  searchWord, 
  setSearchWord, 
  onSearch,
  isDisabled = false
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(searchWord);

  // Debounce para atualizar o estado apenas quando o usuário parar de digitar
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchWord(inputValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.repeat && onSearch && !isDisabled && inputValue.trim()) {
      onSearch(inputValue);
    }
  };

  return (
    <div className="relative">
      <div className="flex">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-white" />
          </div>
          <input
            type="text"
            className="bg-gray-600 border border-gray-300 text-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 placeholder-gray-400" 
            placeholder="Digite uma palavra para buscar..."
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={isDisabled}
          />
        </div>
      </div>
      <p className="mt-1 text-xs text-gray-300">
        Digite uma palavra para buscar no índice e pressione Enter ou clique nos botões abaixo
      </p>
    </div>
  );
}
