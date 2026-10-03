import React from 'react';
import { X, Play, ShoppingBag, Star, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const TrailerModal: React.FC = () => {
  const { trailerMovie, closeTrailer, navigateTo, addToCart, cart, isMoviePurchased } = useApp();

  if (!trailerMovie) return null;

  const isPurchased = isMoviePurchased(trailerMovie.id);
  const inCart = cart.some(i => i.movie.id === trailerMovie.id);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeTrailer}
    >
      <div 
        className="relative w-full max-w-4xl bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header bar with Title & Close button */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center gap-2.5">
            <span className="flex items-center gap-1.5 text-xs font-bold text-red-400 bg-red-950/80 border border-red-800/60 px-2.5 py-1 rounded-lg">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>Trailer Oficial no YouTube</span>
            </span>
            <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">
              {trailerMovie.title}
            </h3>
          </div>
          
          <button
            onClick={closeTrailer}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real YouTube Embedded Iframe */}
        <div className="relative aspect-video w-full bg-slate-950">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${trailerMovie.youtubeVideoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title={trailerMovie.title}
            className="w-full h-full border-0 absolute inset-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Bottom Details & CTAs */}
        <div className="p-5 sm:p-6 bg-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="font-semibold text-white">{trailerMovie.category}</span>
              <span>·</span>
              <span className="tabular-nums">{trailerMovie.duration}</span>
              <span>·</span>
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <span className="font-bold tabular-nums">{trailerMovie.rating.toFixed(1)}</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 max-w-lg line-clamp-2">
              {trailerMovie.youtubeReferenceTitle || trailerMovie.shortDescription}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={`https://www.youtube.com/watch?v=${trailerMovie.youtubeVideoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5"
            >
              <span>Ver no YouTube</span>
              <ExternalLink className="w-3.5 h-3.5 text-red-400" />
            </a>

            {isPurchased ? (
              <button
                onClick={() => {
                  closeTrailer();
                  navigateTo('player', trailerMovie);
                }}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition-all"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Assistir Completo</span>
              </button>
            ) : (
              <button
                onClick={() => {
                  if (inCart) {
                    closeTrailer();
                    navigateTo('cart');
                  } else {
                    addToCart(trailerMovie);
                    closeTrailer();
                    navigateTo('cart');
                  }
                }}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Comprar ({trailerMovie.price.toLocaleString('pt-AO')} Kz)</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
