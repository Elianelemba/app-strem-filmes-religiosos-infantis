import React from 'react';
import { Heart, Film, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MovieCard } from '../components/MovieCard';

export const FavoritesScreen: React.FC = () => {
  const { movies, favorites, navigateTo } = useApp();

  const favoriteMovies = movies.filter(m => favorites.includes(m.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">
          <Heart className="w-3.5 h-3.5 fill-rose-400" />
          <span>Lista Pessoal</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
          Meus Filmes Favoritos
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Filmes guardados para assistir mais tarde ou adquirir quando desejar.
        </p>
      </div>

      {favoriteMovies.length > 0 ? (
        <div className="space-y-4">
          <div className="text-xs text-slate-400">
            <span>A exibir <strong className="text-white tabular-nums">{favoriteMovies.length}</strong> filmes guardados</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {favoriteMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-slate-800 space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-slate-800/80 flex items-center justify-center mx-auto text-rose-400/60">
            <Heart className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white">Ainda não tem filmes favoritos</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Quando encontrar uma história cristã especial, clique no ícone do coração no cartaz para a guardar nesta lista.
          </p>
          <button
            onClick={() => navigateTo('catalog')}
            className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-md hover:bg-amber-400 transition-colors"
          >
            Explorar Catálogo
          </button>
        </div>
      )}

    </div>
  );
};
