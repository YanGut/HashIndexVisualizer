import { Page } from "@/types/Page";

interface PageViewProps {
  page: Page;
  pageNumber: number;
  title: string;
  highlightWord?: string;
}

export default function PageView({ page, pageNumber, title, highlightWord }: PageViewProps) {
  return (
    <div className="border rounded-lg p-4 bg-gray-800 text-gray-200">
  <div className="flex justify-between items-center mb-2">
    <h3 className="text-lg font-semibold">{title}</h3>
    <span className="bg-blue-200 text-blue-900 px-2 py-1 rounded text-sm">
      Página {pageNumber.toLocaleString("pt-BR")}
    </span>
  </div>

  <div className="overflow-y-auto max-h-64 mt-2 border rounded bg-gray-700 p-2">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {page.words.map((word, index) => (
        <div 
          key={index}
          className={`text-xs p-1 truncate rounded ${
            highlightWord === word ? 'bg-yellow-300 text-black font-bold' : 'text-gray-300'
          }`}
          title={word}
        >
          {word}
        </div>
      ))}
    </div>

    {page.words.length === 0 && (
      <p className="text-gray-400 text-center py-4">Página vazia</p>
    )}
  </div>

  <div className="mt-2 text-sm text-gray-200">
    Total de palavras na página: {page.words.length.toLocaleString("pt-BR")}
  </div>
</div>

  );
}