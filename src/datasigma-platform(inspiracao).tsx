import React, { useState, useEffect, useMemo } from 'react';
import { BarChart3, Calculator, History, Moon, Sun, Upload, TrendingUp, PieChart, LineChart, Target, Activity } from 'lucide-react';

const DataSigma = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [inputMethod, setInputMethod] = useState('table');
  const [tableData, setTableData] = useState([{ xi: '', fi: '' }]);
  const [textData, setTextData] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [error, setError] = useState('');

  // Função para calcular estatísticas
  const calculateStats = (data) => {
    const values = [];
    data.forEach(item => {
      for (let i = 0; i < item.fi; i++) {
        values.push(item.xi);
      }
    });

    const n = values.length;
    const mean = values.reduce((sum, val) => sum + val, 0) / n;
    
    // Mediana
    const sorted = [...values].sort((a, b) => a - b);
    const median = n % 2 === 0 ? 
      (sorted[n/2 - 1] + sorted[n/2]) / 2 : 
      sorted[Math.floor(n/2)];

    // Moda
    const freq = {};
    values.forEach(val => freq[val] = (freq[val] || 0) + 1);
    const maxFreq = Math.max(...Object.values(freq));
    const mode = Object.keys(freq).filter(key => freq[key] === maxFreq).map(Number);

    // Variância e Desvio Padrão
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);
    
    // Coeficiente de Variação
    const cv = (stdDev / mean) * 100;

    return {
      mean: mean.toFixed(2),
      median: median.toFixed(2),
      mode: mode.length === 1 ? mode[0] : mode,
      variance: variance.toFixed(2),
      stdDev: stdDev.toFixed(2),
      cv: cv.toFixed(2),
      count: n,
      min: Math.min(...values),
      max: Math.max(...values),
      range: Math.max(...values) - Math.min(...values)
    };
  };

  // Processar dados
  const processData = async () => {
    setError('');
    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulação de processamento

      let processedData = [];
      
      if (inputMethod === 'table') {
        processedData = tableData
          .filter(item => item.xi !== '' && item.fi !== '')
          .map(item => ({
            xi: parseFloat(item.xi),
            fi: parseInt(item.fi)
          }));
      } else {
        const values = textData.split(/[,\s\n]+/)
          .filter(val => val.trim() !== '')
          .map(val => parseFloat(val.trim()));
        
        const freq = {};
        values.forEach(val => freq[val] = (freq[val] || 0) + 1);
        processedData = Object.entries(freq).map(([xi, fi]) => ({
          xi: parseFloat(xi),
          fi: fi
        }));
      }

      if (processedData.length === 0) {
        throw new Error('Nenhum dado válido encontrado');
      }

      const stats = calculateStats(processedData);
      setResults({ stats, data: processedData });
      
      // Adicionar ao histórico
      const newEntry = {
        id: Date.now(),
        timestamp: new Date().toLocaleString(),
        method: inputMethod,
        dataCount: processedData.length,
        mean: stats.mean
      };
      setHistory(prev => [newEntry, ...prev.slice(0, 4)]);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Adicionar nova linha na tabela
  const addTableRow = () => {
    setTableData([...tableData, { xi: '', fi: '' }]);
  };

  // Remover linha da tabela
  const removeTableRow = (index) => {
    if (tableData.length > 1) {
      setTableData(tableData.filter((_, i) => i !== index));
    }
  };

  // Atualizar dados da tabela
  const updateTableData = (index, field, value) => {
    const newData = [...tableData];
    newData[index][field] = value;
    setTableData(newData);
  };

  // Gerar dados para visualização
  const chartData = useMemo(() => {
    if (!results) return [];
    return results.data.map(item => ({
      value: item.xi,
      frequency: item.fi
    }));
  }, [results]);

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-all duration-300 ${
        darkMode 
          ? 'bg-gray-900/80 border-gray-700' 
          : 'bg-white/80 border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                DataSigma
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                  darkMode 
                    ? 'hover:bg-gray-700 text-gray-300' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                <History className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                  darkMode 
                    ? 'hover:bg-gray-700 text-yellow-400' 
                    : 'hover:bg-gray-100 text-gray-600'
                }`}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Painel de Input */}
          <div className="lg:col-span-1 space-y-6">
            <div className={`p-6 rounded-2xl shadow-xl transition-all duration-300 ${
              darkMode 
                ? 'bg-gray-800/50 border border-gray-700' 
                : 'bg-white/70 backdrop-blur-sm border border-white/20'
            }`}>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Upload className="h-5 w-5 mr-2 text-blue-600" />
                Entrada de Dados
              </h2>

              {/* Seletor de método */}
              <div className="mb-6">
                <div className={`flex rounded-lg p-1 ${
                  darkMode ? 'bg-gray-700' : 'bg-gray-100'
                }`}>
                  <button
                    onClick={() => setInputMethod('table')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                      inputMethod === 'table'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                        : darkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Tabela
                  </button>
                  <button
                    onClick={() => setInputMethod('text')}
                    className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                      inputMethod === 'text'
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                        : darkMode ? 'text-gray-300 hover:bg-gray-600' : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    Texto
                  </button>
                </div>
              </div>

              {/* Input por Tabela */}
              {inputMethod === 'table' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-3 text-sm font-medium text-gray-500">
                    <div>Xi (Valor)</div>
                    <div>Fi (Freq.)</div>
                    <div>Ação</div>
                  </div>
                  
                  {tableData.map((row, index) => (
                    <div key={index} className="grid grid-cols-3 gap-3 items-center">
                      <input
                        type="number"
                        value={row.xi}
                        onChange={(e) => updateTableData(index, 'xi', e.target.value)}
                        className={`px-3 py-2 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        placeholder="0.0"
                      />
                      <input
                        type="number"
                        value={row.fi}
                        onChange={(e) => updateTableData(index, 'fi', e.target.value)}
                        className={`px-3 py-2 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        }`}
                        placeholder="1"
                      />
                      <button
                        onClick={() => removeTableRow(index)}
                        disabled={tableData.length === 1}
                        className={`px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                          tableData.length === 1
                            ? 'opacity-50 cursor-not-allowed'
                            : 'hover:bg-red-500 hover:text-white'
                        } ${
                          darkMode ? 'text-red-400 hover:bg-red-500' : 'text-red-600 hover:bg-red-500'
                        }`}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  
                  <button
                    onClick={addTableRow}
                    className={`w-full py-2 px-4 rounded-lg border-2 border-dashed transition-all duration-200 hover:scale-105 ${
                      darkMode 
                        ? 'border-gray-600 hover:border-blue-500 hover:bg-gray-700' 
                        : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
                    }`}
                  >
                    + Adicionar Linha
                  </button>
                </div>
              )}

              {/* Input por Texto */}
              {inputMethod === 'text' && (
                <textarea
                  value={textData}
                  onChange={(e) => setTextData(e.target.value)}
                  rows={6}
                  className={`w-full px-3 py-3 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Digite os valores separados por vírgula, espaço ou quebra de linha&#10;Exemplo: 10, 20, 30, 20, 10"
                />
              )}

              {/* Botão de Processar */}
              <button
                onClick={processData}
                disabled={loading}
                className={`w-full mt-6 py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                  loading ? 'animate-pulse' : ''
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processando...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Calculator className="h-5 w-5 mr-2" />
                    Calcular Estatísticas
                  </div>
                )}
              </button>

              {/* Mensagem de Erro */}
              {error && (
                <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm animate-fadeIn">
                  {error}
                </div>
              )}
            </div>

            {/* Histórico */}
            {showHistory && history.length > 0 && (
              <div className={`p-6 rounded-2xl shadow-xl transition-all duration-300 animate-slideIn ${
                darkMode 
                  ? 'bg-gray-800/50 border border-gray-700' 
                  : 'bg-white/70 backdrop-blur-sm border border-white/20'
              }`}>
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <History className="h-5 w-5 mr-2 text-blue-600" />
                  Histórico Recente
                </h3>
                <div className="space-y-3">
                  {history.map((entry) => (
                    <div key={entry.id} className={`p-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                      darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                    }`}>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-sm font-medium">Método: {entry.method}</div>
                          <div className="text-xs text-gray-500">{entry.timestamp}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm">Média: {entry.mean}</div>
                          <div className="text-xs text-gray-500">{entry.dataCount} valores</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Área de Resultados */}
          <div className="lg:col-span-2 space-y-6">
            {results ? (
              <div className="animate-fadeIn space-y-6">
                {/* Métricas Principais */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                  {[
                    { label: 'Média', value: results.stats.mean, icon: Target, color: 'blue' },
                    { label: 'Mediana', value: results.stats.median, icon: Activity, color: 'green' },
                    { label: 'Desvio Padrão', value: results.stats.stdDev, icon: TrendingUp, color: 'purple' },
                    { label: 'Coef. Variação', value: `${results.stats.cv}%`, icon: PieChart, color: 'orange' }
                  ].map((metric, index) => (
                    <div key={index} className={`p-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 ${
                      darkMode 
                        ? 'bg-gray-800/50 border border-gray-700' 
                        : 'bg-white/70 backdrop-blur-sm border border-white/20'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500 font-medium">{metric.label}</p>
                          <p className="text-2xl font-bold mt-1">{metric.value}</p>
                        </div>
                        <div className={`p-3 rounded-lg bg-gradient-to-br from-${metric.color}-500 to-${metric.color}-600`}>
                          <metric.icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Estatísticas Detalhadas */}
                <div className={`p-6 rounded-2xl shadow-xl transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-800/50 border border-gray-700' 
                    : 'bg-white/70 backdrop-blur-sm border border-white/20'
                }`}>
                  <h3 className="text-xl font-semibold mb-6 flex items-center">
                    <LineChart className="h-6 w-6 mr-2 text-blue-600" />
                    Estatísticas Completas
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { label: 'Quantidade', value: results.stats.count },
                      { label: 'Mínimo', value: results.stats.min },
                      { label: 'Máximo', value: results.stats.max },
                      { label: 'Amplitude', value: results.stats.range },
                      { label: 'Variância', value: results.stats.variance },
                      { label: 'Moda', value: Array.isArray(results.stats.mode) ? results.stats.mode.join(', ') : results.stats.mode }
                    ].map((stat, index) => (
                      <div key={index} className={`p-4 rounded-lg transition-all duration-200 hover:scale-105 ${
                        darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                      }`}>
                        <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
                        <div className="text-lg font-bold mt-1">{stat.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Visualização Simples de Dados */}
                <div className={`p-6 rounded-2xl shadow-xl transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-800/50 border border-gray-700' 
                    : 'bg-white/70 backdrop-blur-sm border border-white/20'
                }`}>
                  <h3 className="text-xl font-semibold mb-6 flex items-center">
                    <BarChart3 className="h-6 w-6 mr-2 text-blue-600" />
                    Distribuição dos Dados
                  </h3>
                  
                  <div className="space-y-3">
                    {chartData.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="w-12 text-right font-medium">{item.value}</div>
                        <div className="flex-1">
                          <div className={`h-8 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-1000 flex items-center justify-end pr-3 text-white text-sm font-medium`}
                               style={{
                                 width: `${(item.frequency / Math.max(...chartData.map(d => d.frequency))) * 100}%`,
                                 minWidth: '60px'
                               }}>
                            {item.frequency}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className={`p-12 rounded-2xl shadow-xl text-center transition-all duration-300 ${
                darkMode 
                  ? 'bg-gray-800/50 border border-gray-700' 
                  : 'bg-white/70 backdrop-blur-sm border border-white/20'
              }`}>
                <div className="max-w-md mx-auto">
                  <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full inline-block mb-6">
                    <Calculator className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Bem-vindo ao DataSigma</h3>
                  <p className="text-gray-500 mb-6">
                    Insira seus dados e descubra insights estatísticos poderosos com visualizações interativas e análises em tempo real.
                  </p>
                  <div className="text-sm text-gray-400">
                    Suporte para análise de frequência, regressão e muito mais.
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        
        .animate-slideIn {
          animation: slideIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DataSigma;