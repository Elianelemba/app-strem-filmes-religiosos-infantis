import React, { useMemo } from 'react';
import { Search, Sparkles, X, Compass } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MovieCard } from '../components/MovieCard';

export const SearchScreen: React.FC = () => {
  const { searchQuery, setSearchQuery, movies, navigateTo } = useApp();

  const quickKeywords = ['Bíblia', 'Coragem', 'Arca de Noé', 'Ester', 'Perdão', 'Música', 'Amor'];

  const results = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return movies.filter(m => 
      m.title.toLowerCase().includes(q) ||
      m.shortDescription.toLowerCase().includes(q) ||
      m.synopsis.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q) ||
      m.moralValues.some(v => v.toLowerCase().includes(q))
    );
  }, [searchQuery, movies]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Search Bar Header */}
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
          Pesquisar Filmes Infantis
        </h1>
        <p className="text-xs text-slate-400">
          Encontre histórias bíblicas, valores educativos, títulos específicos ou temas para os seus filhos.
        </p>

        <div className="relative">
          <Search className="w-5 h-5 text-amber-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Digite por exemplo 'Bíblia', 'Coragem', 'Noé'..."
            autoFocus
            className="w-full pl-12 pr-10 py-3.5 bg-slate-900 border border-slate-700 rounded-2xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 shadow-xl"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Suggestion Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
          <span className="text-slate-500">Termos mais buscados:</span>
          {quickKeywords.map((kw) => (
            <button
              key={kw}
              onClick={() => setSearchQuery(kw)}
              className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 transition-colors text-xs"
            >
              {kw}
            </button>
          ))}
        </div>
      </div>

      {/* Results View */}
      {searchQuery.trim() ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs text-slate-400">
            <span>
              Resultados para "<strong className="text-amber-400">{searchQuery}</strong>":{' '}
              <strong className="text-white">{results.length} filmes</strong>
            </span>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {results.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-4">
              <Search className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">Nenhum resultado encontrado</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Não localizámos filmes com o termo "{searchQuery}". Tente pesquisar por palavras como "Bíblia", "Arca" ou ver o catálogo completo.
              </p>
              <button
                onClick={() => navigateTo('catalog')}
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-md hover:bg-amber-400 transition-colors"
              >
                Ver Todos os Filmes
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Default suggestions when no query is typed */
        <div className="space-y-6 pt-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-slate-800 pb-3">
            <Compass className="w-4 h-4 text-amber-400" />
            <span>Sugestões Populares para Começar</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {movies.slice(0, 4).map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
