import React, { useState } from 'react';
import { 
  PlaySquare, 
  ChevronUp, 
  ChevronDown, 
  Sparkles, 
  Layers, 
  RotateCcw, 
  Film, 
  ShieldCheck, 
  ShoppingBag, 
  CreditCard,
  CheckCircle,
  Tv,
  HelpCircle,
  X
} from 'lucide-react';
import { useApp, ScreenName } from '../context/AppContext';

export const PresentationToolbar: React.FC = () => {
  const { 
    currentScreen, 
    navigateTo, 
    showPresentationToolbar, 
    setShowPresentationToolbar,
    resetDemoData,
    openTrailer,
    selectedMovie
  } = useApp();

  const [isExpanded, setIsExpanded] = useState(false);

  if (!showPresentationToolbar) {
    return (
      <button
        onClick={() => setShowPresentationToolbar(true)}
        className="fixed bottom-3 right-3 z-50 flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 text-slate-950 rounded-full font-bold text-xs shadow-xl hover:bg-amber-400 transition-transform hover:scale-105"
        title="Abrir Modo Apresentação"
      >
        <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
        <span>Modo Apresentação</span>
      </button>
    );
  }

  const primaryFlow: { label: string; screen: ScreenName; desc: string }[] = [
    { label: '1. Splash', screen: 'splash', desc: 'Abertura & Slogan' },
    { label: '2. Onboarding', screen: 'onboarding', desc: '3 Telas ilustradas' },
    { label: '3. Login', screen: 'login', desc: 'Autenticação' },
    { label: '4. Cadastro', screen: 'register', desc: 'Criação de Conta' },
    { label: '5. Home Principal', screen: 'home', desc: 'Hero + Carrosséis' },
    { label: '6. Catálogo', screen: 'catalog', desc: 'Filtros & Grelha' },
    { label: '7. Detalhes', screen: 'movie-details', desc: 'Ficha & Valores Cristãos' },
    { label: '8. Carrinho', screen: 'cart', desc: 'Cupom LUZ10 & Resumo' },
    { label: '9. Checkout', screen: 'checkout', desc: 'Multicaixa Express Angola' },
    { label: '10. Compra Feita', screen: 'order-confirmed', desc: 'Recibo & Sucesso' },
    { label: '11. Biblioteca', screen: 'library', desc: 'Progresso de exibição' },
    { label: '12. Player', screen: 'player', desc: 'Streaming em 1080p' },
  ];

  const secondaryScreens: { label: string; screen: ScreenName }[] = [
    { label: 'Favoritos', screen: 'favorites' },
    { label: 'Controlo Parental', screen: 'parental-control' },
    { label: 'Perfil Familiar', screen: 'profile' },
    { label: 'Histórico de Compras', screen: 'orders-history' },
    { label: 'Notificações', screen: 'notifications' },
    { label: 'Pesquisa', screen: 'search' },
    { label: 'Ofertas / Promoções', screen: 'promotions' },
    { label: 'Sobre a LuzKids', screen: 'about' },
    { label: 'Ajuda & Suporte', screen: 'support' },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 flex flex-col items-center pointer-events-none">
      <div className="pointer-events-auto max-w-5xl w-full mx-auto px-3 pb-3">
        <div className="bg-slate-900/95 backdrop-blur-xl border border-amber-500/40 rounded-2xl shadow-2xl shadow-slate-950/80 overflow-hidden transition-all">
          
          {/* Bar Header */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
              </span>
              <span className="text-xs font-bold text-amber-400 font-display uppercase tracking-wider">
                Navegador do Protótipo (Apresentação / Banca)
              </span>
              <span className="hidden sm:inline-block text-[11px] text-slate-400">
                · Tela Atual: <span className="text-white font-semibold capitalize">{currentScreen}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => openTrailer(selectedMovie)}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-[11px] font-medium text-amber-300 transition-colors"
                title="Testar Modal de Trailer"
              >
                <Film className="w-3 h-3 text-amber-400" />
                <span>Trailer Pop-up</span>
              </button>

              <button
                onClick={resetDemoData}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-[11px] text-slate-300 transition-colors"
                title="Repor Dados da Demonstração"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Repor Dados</span>
              </button>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs font-semibold"
              >
                <span>{isExpanded ? 'Recolher' : 'Ver Todas as Telas'}</span>
                {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => setShowPresentationToolbar(false)}
                className="p-1 text-slate-400 hover:text-white"
                title="Ocultar Barra"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Flow Scrollable Row */}
          <div className="px-3 py-2 overflow-x-auto no-scrollbar flex items-center gap-1.5 bg-slate-950/60">
            {primaryFlow.map((item, idx) => {
              const isActive = currentScreen === item.screen;
              return (
                <button
                  key={item.screen}
                  onClick={() => navigateTo(item.screen)}
                  className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30 scale-105'
                      : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                  }`}
                >
                  <span className="tabular-nums opacity-75">{idx + 1}.</span>
                  <span>{item.label.replace(/^\d+\.\s*/, '')}</span>
                </button>
              );
            })}
          </div>

          {/* Expanded Drawer for Secondary Screens & Features */}
          {isExpanded && (
            <div className="p-4 bg-slate-900 border-t border-slate-800 max-h-64 overflow-y-auto animate-in slide-in-from-bottom-2">
              <div className="mb-3">
                <h5 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Telas Complementares & Gestão
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {secondaryScreens.map(sec => (
                    <button
                      key={sec.screen}
                      onClick={() => {
                        navigateTo(sec.screen);
                        setIsExpanded(false);
                      }}
                      className={`px-3 py-2 rounded-xl text-xs font-semibold text-left transition-all border ${
                        currentScreen === sec.screen
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                          : 'bg-slate-950/50 text-slate-300 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {sec.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>
                  💡 Dica para a banca: Pode navegar naturalmente clicando nos botões e cartazes, ou usar este painel de atalhos para saltar imediatamente para qualquer módulo.
                </span>
                <span className="text-amber-400 font-semibold shrink-0 ml-4">
                  LuzKids v1.0 Angola
                </span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
