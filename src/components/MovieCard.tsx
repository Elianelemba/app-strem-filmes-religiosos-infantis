import React from 'react';
import { Play, Heart, ShoppingBag, Check, Star, ShieldCheck } from 'lucide-react';
import { Movie } from '../types';
import { useApp } from '../context/AppContext';

interface MovieCardProps {
  movie: Movie;
  variant?: 'portrait' | 'compact' | 'horizontal';
  showProgress?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  variant = 'portrait',
  showProgress = false
}) => {
  const { 
    navigateTo, 
    openTrailer, 
    toggleFavorite, 
    isFavorite, 
    isMoviePurchased, 
    addToCart,
    cart 
  } = useApp();

  const isPurchased = isMoviePurchased(movie.id);
  const isInCart = cart.some(item => item.movie.id === movie.id);
  const fav = isFavorite(movie.id);

  const getAgeRatingColor = (rating: string) => {
    switch (rating) {
      case 'Livre': return 'text-emerald-400 bg-emerald-950/80 border-emerald-800/60';
      case '+3': return 'text-sky-400 bg-sky-950/80 border-sky-800/60';
      case '+6': return 'text-amber-400 bg-amber-950/80 border-amber-800/60';
      default: return 'text-purple-400 bg-purple-950/80 border-purple-800/60';
    }
  };

  if (variant === 'horizontal') {
    return (
      <div 
        onClick={() => navigateTo('movie-details', movie)}
        className="group relative flex flex-col sm:flex-row gap-4 p-3 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-amber-500/40 transition-all duration-200 hover:shadow-xl hover:shadow-amber-500/5 cursor-pointer"
      >
        <div className="relative w-full sm:w-44 h-48 sm:h-32 rounded-xl overflow-hidden bg-slate-950 shrink-0">
          <img 
            src={movie.posterUrl} 
            alt={movie.title}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
          {movie.isPromo && (
            <div className="absolute top-2 left-2 bg-amber-500 text-slate-950 font-bold text-[10px] px-2 py-0.5 rounded shadow">
              -{movie.discountPercent}%
            </div>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between py-1">
          <div>
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-xs font-medium text-amber-400/90">{movie.category}</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${getAgeRatingColor(movie.ageRating)}`}>
                {movie.ageRating}
              </span>
            </div>
            <h4 className="text-base font-semibold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
              {movie.title}
            </h4>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              {movie.shortDescription}
            </p>
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800/60 text-xs">
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="tabular-nums">{movie.duration}</span>
              <span>·</span>
              <div className="flex items-center text-amber-400 gap-0.5">
                <Star className="w-3 h-3 fill-amber-400" />
                <span className="tabular-nums font-medium">{movie.rating.toFixed(1)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-amber-400 tabular-nums">
                {movie.price.toLocaleString('pt-AO')} Kz
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="group relative flex flex-col rounded-2xl bg-slate-900/50 border border-slate-800/70 hover:border-amber-500/40 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/10 cursor-pointer overflow-hidden"
    >
      {/* Poster Image Container */}
      <div 
        onClick={() => navigateTo('movie-details', movie)}
        className="relative aspect-[3/4] w-full overflow-hidden bg-slate-950"
      >
        <img 
          src={movie.posterUrl} 
          alt={movie.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
        />

        {/* Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Top Badges & Favorite Button */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getAgeRatingColor(movie.ageRating)}`}>
              {movie.ageRating}
            </span>
            {movie.isPromo && (
              <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-1.5 py-0.5 rounded shadow">
                -{movie.discountPercent}%
              </span>
            )}
          </div>

          <button 
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(movie.id);
            }}
            title={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              fav 
                ? 'bg-rose-500/90 text-white shadow-lg shadow-rose-500/30' 
                : 'bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${fav ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Hover Trailer Quick Play Trigger */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
          <div 
            onClick={(e) => {
              e.stopPropagation();
              openTrailer(movie);
            }}
            className="pointer-events-auto flex items-center gap-2 px-3.5 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-xl shadow-red-600/30 hover:scale-105 transition-transform"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            <span>Trailer YouTube</span>
          </div>
        </div>

        {/* Watch Progress bar if applicable */}
        {showProgress && movie.completionPercent !== undefined && (
          <div className="absolute bottom-0 inset-x-0 bg-slate-950/80 p-2 backdrop-blur-sm">
            <div className="flex items-center justify-between text-[11px] text-slate-300 mb-1">
              <span>{movie.completionPercent}% assistido</span>
              <span className="text-amber-400">Continuar</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
              <div 
                className="bg-amber-500 h-full rounded-full transition-all"
                style={{ width: `${movie.completionPercent}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Card Content & Metadata */}
      <div 
        onClick={() => navigateTo('movie-details', movie)}
        className="p-3.5 flex flex-col justify-between flex-1 bg-slate-900/70"
      >
        <div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mb-1">
            <span>{movie.category}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">{movie.duration}</span>
          </div>

          <h3 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors line-clamp-1">
            {movie.title}
          </h3>

          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {movie.shortDescription}
          </p>
        </div>

        {/* Values tag preview */}
        <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center gap-1 text-[10px] text-emerald-400/90 truncate">
          <ShieldCheck className="w-3 h-3 shrink-0" />
          <span className="truncate">{movie.moralValues[0]}</span>
        </div>

        {/* Price & Action Button */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <div>
            {isPurchased ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400">
                <Check className="w-3.5 h-3.5" />
                Adquirido
              </span>
            ) : (
              <div className="flex items-baseline gap-1.5">
                <span className="text-sm font-bold text-amber-400 tabular-nums">
                  {movie.price.toLocaleString('pt-AO')} Kz
                </span>
                {movie.originalPrice && (
                  <span className="text-[11px] text-slate-500 line-through tabular-nums">
                    {movie.originalPrice.toLocaleString('pt-AO')} Kz
                  </span>
                )}
              </div>
            )}
          </div>

          <div>
            {isPurchased ? (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigateTo('player', movie);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium transition-colors shadow-sm"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>Assistir</span>
              </button>
            ) : (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  if (isInCart) {
                    navigateTo('cart');
                  } else {
                    addToCart(movie);
                  }
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isInCart
                    ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-800/50 hover:bg-emerald-900/80'
                    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                }`}
              >
                <ShoppingBag className="w-3 h-3" />
                <span>{isInCart ? 'No Carrinho' : 'Comprar'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
