import React, { useState, useEffect } from 'react';
import { Tag, Clock, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MovieCard } from '../components/MovieCard';

export const PromotionsScreen: React.FC = () => {
  const { movies, navigateTo } = useApp();
  
  const promoMovies = movies.filter(m => m.isPromo);

  // Countdown timer simulation (e.g. 2 days, 14 hours, 32 mins, 45 secs)
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: 59, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Promotional Banner with Countdown */}
      <div className="rounded-3xl bg-gradient-to-r from-amber-600/30 via-slate-900 to-amber-950/40 border border-amber-500/40 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <div className="max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FESTIVAL FAMÍLIA EM PAZ</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display text-white">
            Ofertas Especiais de Fim de Semana
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
            Descontos de até 28% em clássicos bíblicos e animações educativas para fortalecer a sua casa com fé e alegria.
          </p>

          {/* Countdown Clock */}
          <div className="pt-2 flex items-center gap-3">
            <span className="text-xs text-slate-400 font-semibold flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Tempo restante:</span>
            </span>

            <div className="flex items-center gap-2 text-center font-mono">
              <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                <span className="text-sm font-bold text-amber-400 tabular-nums">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </span>
                <span className="block text-[9px] text-slate-500 uppercase">Horas</span>
              </div>
              <span className="text-amber-500 font-bold">:</span>
              <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                <span className="text-sm font-bold text-amber-400 tabular-nums">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </span>
                <span className="block text-[9px] text-slate-500 uppercase">Min</span>
              </div>
              <span className="text-amber-500 font-bold">:</span>
              <div className="bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                <span className="text-sm font-bold text-amber-400 tabular-nums">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </span>
                <span className="block text-[9px] text-slate-500 uppercase">Seg</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Movies in Promotion */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-xl font-black font-display text-white">
            Filmes com Desconto Aplicado
          </h2>
          <span className="text-xs text-slate-400">{promoMovies.length} títulos em promoção</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {promoMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>

    </div>
  );
};
