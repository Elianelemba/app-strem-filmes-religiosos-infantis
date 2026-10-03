import React, { useState, useMemo } from 'react';
import { Search, Filter, RotateCcw, SlidersHorizontal, Sparkles, Film } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MovieCard } from '../components/MovieCard';
import { MovieCategory, AgeRating } from '../types';

export const CatalogScreen: React.FC = () => {
  const { 
    movies, 
    searchQuery, 
    setSearchQuery, 
    selectedCategory, 
    setSelectedCategory,
    selectedAgeRating,
    setSelectedAgeRating
  } = useApp();

  const [priceFilter, setPriceFilter] = useState<'all' | 'under1500' | 'over1500'>('all');
  const [durationFilter, setDurationFilter] = useState<'all' | 'short' | 'long'>('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'newest' | 'price-asc' | 'price-desc' | 'rating'>('popularity');
  const [showFiltersMobile, setShowFiltersMobile] = useState(false);

  const categories: string[] = [
    'Todos',
    'Histórias Bíblicas',
    'Aventuras',
    'Fé e Valores',
    'Animação',
    'Família',
    'Música',
    'Educação'
  ];

  const ageRatings: string[] = ['Todos', 'Livre', '+3', '+6'];

  // Filtering logic
  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = movie.title.toLowerCase().includes(query);
        const matchesDesc = movie.shortDescription.toLowerCase().includes(query);
        const matchesCategory = movie.category.toLowerCase().includes(query);
        const matchesValues = movie.moralValues.some(v => v.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesCategory && !matchesValues) return false;
      }

      // Category
      if (selectedCategory !== 'Todos' && movie.category !== selectedCategory) {
        return false;
      }

      // Age Rating
      if (selectedAgeRating !== 'Todos' && movie.ageRating !== selectedAgeRating) {
        return false;
      }

      // Price filter
      if (priceFilter === 'under1500' && movie.price > 1500) return false;
      if (priceFilter === 'over1500' && movie.price <= 1500) return false;

      // Duration filter
      if (durationFilter === 'short' && movie.durationMinutes > 60) return false;
      if (durationFilter === 'long' && movie.durationMinutes <= 60) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'popularity') return (b.reviewCount || 0) - (a.reviewCount || 0);
      if (sortBy === 'newest') return (b.year || 0) - (a.year || 0);
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [movies, searchQuery, selectedCategory, selectedAgeRating, priceFilter, durationFilter, sortBy]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('Todos');
    setSelectedAgeRating('Todos');
    setPriceFilter('all');
    setDurationFilter('all');
    setSortBy('popularity');
  };

  const hasActiveFilters = 
    searchQuery !== '' || 
    selectedCategory !== 'Todos' || 
    selectedAgeRating !== 'Todos' || 
    priceFilter !== 'all' || 
    durationFilter !== 'all';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            <Film className="w-3.5 h-3.5" />
            <span>Videoteca Completa</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
            Todos os Filmes Infantis
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Explore {movies.length} títulos cristãos educativos para todas as idades com pagamento simples em Kwanzas.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar por título, lição ou tema..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Filter Controls Row */}
      <div className="space-y-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Secondary Filters Bar */}
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="flex flex-wrap items-center gap-3">
            {/* Age Rating selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium text-[11px]">Faixa Etária:</span>
              <div className="flex items-center gap-1 p-0.5 bg-slate-950 rounded-lg border border-slate-800">
                {ageRatings.map(age => (
                  <button
                    key={age}
                    onClick={() => setSelectedAgeRating(age)}
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                      selectedAgeRating === age 
                        ? 'bg-amber-500 text-slate-950 font-bold' 
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {age}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium text-[11px]">Preço:</span>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="all">Qualquer Preço</option>
                <option value="under1500">Até 1.500 Kz</option>
                <option value="over1500">Acima de 1.500 Kz</option>
              </select>
            </div>

            {/* Duration Filter */}
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium text-[11px]">Duração:</span>
              <select
                value={durationFilter}
                onChange={(e) => setDurationFilter(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
              >
                <option value="all">Todas</option>
                <option value="short">Curtos (até 60 min)</option>
                <option value="long">Longos (+60 min)</option>
              </select>
            </div>
          </div>

          {/* Sort selector & reset */}
          <div className="flex items-center gap-3 ml-auto">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400 font-medium text-[11px]">Ordenar por:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-slate-200 text-xs focus:outline-none focus:border-amber-500 font-semibold"
              >
                <option value="popularity">Mais Populares</option>
                <option value="newest">Lançamentos Recentes</option>
                <option value="rating">Melhor Avaliados</option>
                <option value="price-asc">Preço: Menor para Maior</option>
                <option value="price-desc">Preço: Maior para Menor</option>
              </select>
            </div>

            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 px-2.5 py-1 text-amber-400 hover:text-amber-300 text-xs font-semibold transition-colors"
                title="Limpar todos os filtros"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Limpar</span>
              </button>
            )}
          </div>

        </div>
      </div>

      {/* Movies Grid */}
      {filteredMovies.length > 0 ? (
        <div>
          <div className="flex items-center justify-between mb-4 text-xs text-slate-400">
            <span>A exibir <strong className="text-white tabular-nums">{filteredMovies.length}</strong> filmes</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      ) : (
        /* Empty Results State */
        <div className="text-center py-16 px-4 bg-slate-900/40 rounded-3xl border border-slate-800/80 space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">Nenhum filme encontrado</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Não encontramos filmes correspondentes aos filtros ou termo de pesquisa selecionados.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-md hover:bg-amber-400 transition-colors"
          >
            Limpar Filtros e Ver Todos
          </button>
        </div>
      )}

    </div>
  );
};
