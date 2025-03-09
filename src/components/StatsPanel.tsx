interface StatsPanelProps {
  collisionRate: number;
  overflowsRate: number;
  searchCost: number;
  scanCost: number;
  timeDifference: number;
}

export default function StatsPanel({ 
  collisionRate, 
  overflowsRate, 
  searchCost, 
  scanCost,
  timeDifference
}: StatsPanelProps) {
  return (
    <div className="space-y-4 ">
      <div className="grid grid-cols-1 gap-3">
        <div className="bg-gray-700 border rounded-lg p-3">
          <h3 className="text-sm font-medium text-gray-200">Taxa de Colisões</h3>
          <div className="flex items-center mt-1">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-500" 
                style={{ width: `${Math.min(collisionRate, 100)}%` }}
              ></div>
            </div>
            <span className="ml-2 text-lg font-bold">{collisionRate.toFixed(2)}%</span>
          </div>
        </div>
        
        <div className="bg-gray-700 border rounded-lg p-3">
          <h3 className="text-sm font-medium text-gray-200">Taxa de Overflows</h3>
          <div className="flex items-center mt-1">
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-red-500" 
                style={{ width: `${Math.min(overflowsRate, 100)}%` }}
              ></div>
            </div>
            <span className="ml-2 text-lg font-bold">{overflowsRate.toFixed(2)}%</span>
          </div>
        </div>
      </div>
      
      <div className="border-t pt-4">
        <h3 className="text-sm font-semibold text-gray-200 mb-2">Estimativa de Custo</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm">Busca com Índice:</span>
            <span className="font-medium">{searchCost} acesso(s)</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm">Table Scan:</span>
            <span className="font-medium">{scanCost} acesso(s)</span>
          </div>
          
          {searchCost > 0 && scanCost > 0 && (
            <div className="flex justify-between items-center pt-2 border-t">
              <span className="text-sm">Economia de acessos:</span>
              <span className={`font-medium ${scanCost > searchCost ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(scanCost - searchCost)} acesso(s)
                {scanCost > searchCost ? ' (com índice)' : ' (com table scan)'}
              </span>
            </div>
          )}
        </div>
      </div>
      
      {timeDifference !== 0 && (
        <div className="border-t pt-4">
          <h3 className="text-sm font-semibold text-gray-200 mb-2">Tempo de Processamento</h3>
          <div className="bg-gray-700 rounded-lg p-3 border">
            <div className="flex justify-between items-center">
              <span>Diferença:</span>
              <span className={`font-bold ${timeDifference > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {Math.abs(timeDifference).toFixed(2)}ms
                {timeDifference > 0 ? ' mais rápido com índice' : ' mais rápido com table scan'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}