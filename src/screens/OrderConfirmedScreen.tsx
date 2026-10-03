import React from 'react';
import { CheckCircle2, Play, BookOpen, Download, Share2, Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const OrderConfirmedScreen: React.FC = () => {
  const { latestOrder, navigateTo, selectedMovie } = useApp();

  const order = latestOrder || {
    orderNumber: 'LK-2026-9941',
    date: 'Hoje, agora mesmo',
    movies: [selectedMovie],
    totalAmount: selectedMovie.price,
    paymentMethod: 'express',
    status: 'Pago',
    transactionRef: 'MCX-88492019'
  };

  const primaryMovie = order.movies[0] || selectedMovie;

  const getMethodLabel = (method: string) => {
    switch (method) {
      case 'express': return 'Multicaixa Express (Angola)';
      case 'card': return 'Cartão Bancário';
      default: return 'Transferência Bancária (BAI)';
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      
      {/* Top celebratory icon & title */}
      <div className="text-center space-y-3">
        <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 animate-in zoom-in-95 duration-300">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-xs font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>PAGAMENTO APROVADO COM SUCESSO</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black font-display text-white">
          Parabéns! O filme já é seu.
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
          O conteúdo já está desbloqueado para sempre na videoteca da sua família. Pode assistir agora ou quando quiser!
        </p>
      </div>

      {/* Order Receipt Box */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
        
        {/* Receipt Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4 text-xs">
          <div>
            <span className="text-slate-400 block">Número do Pedido:</span>
            <span className="font-mono font-bold text-amber-400 text-sm">{order.orderNumber}</span>
          </div>

          <div className="sm:text-right">
            <span className="text-slate-400 block">Data e Hora:</span>
            <span className="font-medium text-slate-200">{order.date}</span>
          </div>
        </div>

        {/* Movie Purchased Spotlight */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800/80">
          <div className="w-16 h-20 rounded-xl overflow-hidden bg-slate-900 shrink-0">
            <img 
              src={primaryMovie.posterUrl} 
              alt={primaryMovie.title}
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                {primaryMovie.category}
              </span>
              <span className="text-[10px] text-slate-400">
                Classificação: {primaryMovie.ageRating}
              </span>
            </div>
            <h3 className="text-sm font-bold text-white truncate">{primaryMovie.title}</h3>
            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{primaryMovie.shortDescription}</p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-sm font-black text-amber-400 tabular-nums">
              {order.totalAmount.toLocaleString('pt-AO')} Kz
            </span>
            <span className="block text-[10px] text-emerald-400 font-semibold mt-0.5">Acesso Vitalício</span>
          </div>
        </div>

        {/* Receipt Specs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[11px] block">Método Utilizado:</span>
            <span className="font-semibold text-white mt-0.5 block">{getMethodLabel(order.paymentMethod)}</span>
          </div>

          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800">
            <span className="text-slate-400 text-[11px] block">Referência de Transação:</span>
            <span className="font-mono font-semibold text-slate-200 mt-0.5 block">{order.transactionRef}</span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-slate-800">
          <button
            onClick={() => navigateTo('player', primaryMovie)}
            className="w-full flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 transition-all hover:scale-[1.02]"
          >
            <Play className="w-4 h-4 fill-slate-950" />
            <span>Assistir Agora na LuzKids</span>
          </button>

          <button
            onClick={() => navigateTo('library')}
            className="w-full sm:w-auto flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition-colors"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Ir para Minha Biblioteca</span>
          </button>
        </div>

      </div>

    </div>
  );
};
