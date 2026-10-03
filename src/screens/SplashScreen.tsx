import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Film } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { familyWatching } from '../data/mockData';

export const SplashScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setPulse(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-[92vh] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Background ambient light effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 sm:w-[650px] h-96 sm:h-[650px] bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-sky-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center">
        
        {/* Animated Brand Emblem */}
        <div className={`mb-6 transition-all duration-700 transform ${pulse ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 bg-amber-400 rounded-3xl blur-xl opacity-40 animate-pulse" />
            <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 flex items-center justify-center shadow-2xl shadow-amber-500/30">
              <Sparkles className="w-12 h-12 text-slate-950 fill-slate-950" />
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white mb-3">
          Luz<span className="text-amber-400">Kids</span>
        </h1>

        {/* Slogan */}
        <p className="text-lg sm:text-2xl text-amber-200/90 font-medium mb-6 font-display">
          "Histórias que ensinam, inspiram e aproximam."
        </p>

        {/* Short description */}
        <p className="text-sm sm:text-base text-slate-300 max-w-lg mb-8 leading-relaxed">
          A plataforma digital segura para famílias descobrirem e assistirem a filmes infantis com valores cristãos, fé e educação.
        </p>

        {/* Family Illustration Preview */}
        <div className="relative w-full max-w-md h-52 sm:h-64 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl mb-8 group">
          <img 
            src={familyWatching} 
            alt="Família assistindo junta a LuzKids"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
          <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-[11px] text-slate-300 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800/80">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              100% Protegido para Crianças
            </span>
            <span className="text-amber-400 font-bold">Sem Anúncios</span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
          <button
            onClick={() => navigateTo('onboarding')}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Conhecer a Plataforma</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => navigateTo('home')}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-800 transition-colors"
          >
            <Film className="w-4 h-4 text-amber-400" />
            <span>Ir Direto para os Filmes</span>
          </button>
        </div>

        {/* Subtitle trust statement */}
        <div className="mt-8 flex items-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/30" />
            Feito para pais e filhos
          </span>
          <span>·</span>
          <span>Angola & Lusofonia</span>
        </div>

      </div>
    </div>
  );
};
