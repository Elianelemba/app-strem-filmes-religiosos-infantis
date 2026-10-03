import React, { useState } from 'react';
import { 
  Play, 
  ArrowLeft, 
  ShieldCheck, 
  Star,
  ExternalLink,
  Tv,
  Film,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MovieCard } from '../components/MovieCard';

export const PlayerScreen: React.FC = () => {
  const { selectedMovie, movies, navigateTo } = useApp();
  
  // Default to YouTube mode as requested by user
  const [playerMode, setPlayerMode] = useState<'youtube' | 'native'>('youtube');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const recommendedMovies = movies
    .filter(m => m.id !== selectedMovie.id)
    .slice(0, 4);

  return (
    <div className="pb-16 space-y-8">
      
      {/* Top Bar with Return button & YouTube badge */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={() => navigateTo('library')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-amber-400 transition-colors bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800 w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar à Minha Biblioteca</span>
        </button>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* YouTube connection indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-950/80 border border-red-800/60 text-red-400">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-bold text-[11px] tracking-wide">YOUTUBE CONECTADO</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 px-3 py-1.5 rounded-xl border border-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="hidden sm:inline">Ambiente Seguro LuzKids</span>
          </div>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-2xl border border-slate-800 text-xs">
          <button
            onClick={() => setPlayerMode('youtube')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
              playerMode === 'youtube'
                ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span>Vídeo / Trailer do YouTube</span>
          </button>

          <button
            onClick={() => setPlayerMode('native')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all ${
              playerMode === 'native'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Tv className="w-4 h-4" />
            <span>Player Nativo 1080p</span>
          </button>
        </div>

        {/* Direct YouTube link */}
        <a
          href={`https://www.youtube.com/watch?v=${selectedMovie.youtubeVideoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-semibold"
        >
          <span>Abrir no YouTube oficial</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Big Screen Player Canvas */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div 
          className={`relative aspect-video w-full bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 ${
            isFullscreen ? 'fixed inset-0 z-50 rounded-none h-screen w-screen' : ''
          }`}
        >
          {playerMode === 'youtube' ? (
            /* YouTube Embedded Iframe */
            <div className="w-full h-full relative bg-slate-950">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selectedMovie.youtubeVideoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={selectedMovie.title}
                className="w-full h-full border-0 absolute inset-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : (
            /* Native Styled Simulation Video Player */
            <div className="relative w-full h-full group">
              <img 
                src={selectedMovie.backdropUrl || selectedMovie.posterUrl} 
                alt={selectedMovie.title}
                className="w-full h-full object-cover object-center filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/40" />

              <div className="absolute top-4 inset-x-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-amber-400 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-700/80">
                    PLAYER NATIVO LUZKIDS
                  </span>
                  <h2 className="text-sm sm:text-base font-bold text-white drop-shadow">
                    {selectedMovie.title}
                  </h2>
                </div>
                <span className="text-xs font-semibold text-emerald-400 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
                  1080p Full HD
                </span>
              </div>

              {/* Center Play Button that switches to YouTube */}
              <button
                onClick={() => setPlayerMode('youtube')}
                className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-2xl transition-transform hover:scale-110"
                title="Reproduzir vídeo do YouTube"
              >
                <Play className="w-9 h-9 fill-white ml-1" />
              </button>

              <div className="absolute bottom-4 inset-x-6 flex items-center justify-between text-xs text-slate-300 bg-slate-950/80 p-3 rounded-2xl backdrop-blur-md border border-slate-800">
                <span className="font-semibold text-amber-400">
                  {selectedMovie.title} · Acesso Vitalício Ativo
                </span>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="hover:text-amber-400"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* YouTube Reference Callout Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-500 shrink-0">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-red-400 bg-red-950/80 px-2 py-0.5 rounded border border-red-800/60 uppercase">
                  Vídeo Disponível no YouTube
                </span>
                <span className="text-xs text-slate-400 font-mono">ID: {selectedMovie.youtubeVideoId}</span>
              </div>
              <h3 className="text-sm font-bold text-white mt-0.5 line-clamp-1">
                {selectedMovie.youtubeReferenceTitle || selectedMovie.title}
              </h3>
            </div>
          </div>

          <a
            href={`https://www.youtube.com/watch?v=${selectedMovie.youtubeVideoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md transition-all shrink-0"
          >
            <span>Assistir no App do YouTube</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Movie Details Under Player */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                  {selectedMovie.category}
                </span>
                <span className="text-xs text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/40">
                  Faixa: {selectedMovie.ageRating}
                </span>
                <div className="flex items-center text-xs text-amber-400 gap-1">
                  <Star className="w-3 h-3 fill-amber-400" />
                  <span className="font-bold tabular-nums">{selectedMovie.rating.toFixed(1)}</span>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
                {selectedMovie.title}
              </h1>
            </div>

            <div className="text-xs text-slate-400">
              <span>Áudio: <strong className="text-white">Português</strong></span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
            {selectedMovie.synopsis}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-400">Valores em destaque:</span>
            {selectedMovie.moralValues.map((val, idx) => (
              <span key={idx} className="text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-0.5 rounded-md">
                {val}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Next Movies */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <h3 className="text-lg font-bold font-display text-white">
            Mais Filmes Cristãos Disponíveis
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {recommendedMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

    </div>
  );
};
