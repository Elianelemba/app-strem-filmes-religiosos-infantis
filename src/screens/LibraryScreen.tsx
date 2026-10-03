import React, { useState } from 'react';
import { 
  Play, 
  Film, 
  Heart, 
  Download, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MovieCard } from '../components/MovieCard';
import { Movie } from '../types';

export const LibraryScreen: React.FC = () => {
  const { 
    movies, 
    purchasedMovieIds, 
    favorites, 
    navigateTo 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'watching' | 'all' | 'favorites' | 'downloads'>('watching');

  const purchasedMovies = movies.filter(m => purchasedMovieIds.includes(m.id));
  const favoriteMovies = movies.filter(m => favorites.includes(m.id));
  const inProgressMovies = purchasedMovies.filter(m => m.completionPercent && m.completionPercent > 0);

  const downloadedMovies = [
    { movie: purchasedMovies[0] || movies[0], size: '840 MB', quality: '1080p Full HD' },
    { movie: purchasedMovies[1] || movies[1], size: '920 MB', quality: '1080p Full HD' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            <Film className="w-3.5 h-3.5" />
            <span>Videoteca Pessoal da Família</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
            Minha Biblioteca
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Todos os seus filmes adquiridos com acesso vitalício, sem anúncios e com qualidade máxima.
          </p>
        </div>

        {/* Family stats pill */}
        <div className="flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-2xl border border-slate-800 text-xs">
          <div>
            <span className="text-slate-400 text-[10px] block">Filmes Adquiridos:</span>
            <span className="font-bold text-amber-400 tabular-nums">{purchasedMovies.length} títulos</span>
          </div>
          <div className="h-6 w-px bg-slate-800" />
          <div>
            <span className="text-slate-400 text-[10px] block">Status:</span>
            <span className="font-bold text-emerald-400 flex items-center gap-1">
              <Check className="w-3 h-3" /> Acesso Ativo
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar border-b border-slate-800/80 pb-3">
        <button
          onClick={() => setActiveTab('watching')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'watching'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
              : 'bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Play className="w-3.5 h-3.5" />
          <span>Continuar Assistindo</span>
          {inProgressMovies.length > 0 && (
            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-950/40">
              {inProgressMovies.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('all')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'all'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
              : 'bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Film className="w-3.5 h-3.5" />
          <span>Meus Filmes ({purchasedMovies.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'favorites'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
              : 'bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Heart className="w-3.5 h-3.5" />
          <span>Favoritos ({favoriteMovies.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('downloads')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'downloads'
              ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
              : 'bg-slate-900/60 text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Download className="w-3.5 h-3.5" />
          <span>Downloads Offline ({downloadedMovies.length})</span>
        </button>
      </div>

      {/* Tab 1: Continuar Assistindo */}
      {activeTab === 'watching' && (
        <div className="space-y-6">
          {inProgressMovies.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgressMovies.map(movie => (
                <div 
                  key={movie.id}
                  className="rounded-2xl bg-slate-900/70 border border-slate-800 overflow-hidden group hover:border-amber-500/40 transition-all shadow-xl"
                >
                  <div className="relative aspect-video w-full bg-slate-950">
                    <img 
                      src={movie.backdropUrl || movie.posterUrl} 
                      alt={movie.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                    
                    <button
                      onClick={() => navigateTo('player', movie)}
                      className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                    >
                      <Play className="w-5 h-5 fill-slate-950 ml-0.5" />
                    </button>

                    <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 p-2.5 backdrop-blur-md">
                      <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                        <span>{movie.completionPercent}% assistido</span>
                        <span className="text-amber-400 font-semibold">Continuar</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-amber-500 h-full rounded-full"
                          style={{ width: `${movie.completionPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-white line-clamp-1">{movie.title}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{movie.category} · {movie.duration}</p>
                    </div>

                    <button
                      onClick={() => navigateTo('player', movie)}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
                    >
                      Assistir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-900/30 rounded-2xl border border-slate-800 text-slate-400 text-xs">
              Nenhum filme em reprodução recente. Escolha um filme abaixo para começar!
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Meus Filmes */}
      {activeTab === 'all' && (
        <div className="space-y-6">
          {purchasedMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {purchasedMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} showProgress />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-900/30 rounded-3xl border border-slate-800 space-y-4">
              <Film className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-lg font-bold text-white">Nenhum filme adquirido ainda</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Adquira filmes cristãos para a sua família para tê-los salvos aqui permanentemente.
              </p>
              <button
                onClick={() => navigateTo('catalog')}
                className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs shadow-lg hover:bg-amber-400"
              >
                Explorar Catálogo
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Favoritos */}
      {activeTab === 'favorites' && (
        <div className="space-y-6">
          {favoriteMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {favoriteMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-slate-900/30 rounded-3xl border border-slate-800 text-xs text-slate-400">
              Nenhum filme adicionado aos favoritos. Clique no coração de qualquer cartaz para guardar!
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Downloads Offline */}
      {activeTab === 'downloads' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between text-xs text-amber-300">
            <span className="flex items-center gap-2">
              <Download className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Modo Viagem Ativo: Estes filmes podem ser reproduzidos sem qualquer ligação à internet.</span>
            </span>
          </div>

          <div className="space-y-3">
            {downloadedMovies.map((item, idx) => (
              <div 
                key={idx}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-20 rounded-xl overflow-hidden bg-slate-950 shrink-0">
                    <img 
                      src={item.movie.posterUrl} 
                      alt={item.movie.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{item.movie.title}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{item.movie.duration} · {item.quality}</p>
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 mt-1 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Descarregado ({item.size})
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigateTo('player', item.movie)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Assistir Offline</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
