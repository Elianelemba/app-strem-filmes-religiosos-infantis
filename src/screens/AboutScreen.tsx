import React from 'react';
import { Sparkles, ShieldCheck, Heart, Users, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { familyWatching } from '../data/mockData';

export const AboutScreen: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Top Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 mb-2">
          <Sparkles className="w-7 h-7 fill-amber-400" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-display text-white">
          Sobre a LuzKids
        </h1>
        <p className="text-lg sm:text-xl text-amber-200/90 font-medium font-display">
          "Histórias que ensinam, inspiram e aproximam."
        </p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Nascida do desejo profundo de pais e educadores em Angola, a LuzKids é um refúgio digital seguro onde a infância é honrada e os valores cristãos são transmitidos com beleza e arte.
        </p>
      </div>

      {/* Visual illustration of family */}
      <div className="relative aspect-[21/9] rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
        <img 
          src={familyWatching} 
          alt="Família reunida assistindo filmes LuzKids"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-white">
          <span className="font-semibold bg-slate-950/80 px-3 py-1.5 rounded-xl border border-slate-800">
            Criado em Luanda para famílias de toda a lusofonia
          </span>
        </div>
      </div>

      {/* Mission & Purpose */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
            <BookOpen className="w-5 h-5" />
            <span>Nossa Missão</span>
          </div>
          <h3 className="text-xl font-black font-display text-white">
            Nutrir a mente e o coração dos pequenos
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Oferecer entretenimento infantil de alta qualidade visual e musical que promova fé em Deus, amor à família, respeito aos outros, honestidade e perseverança moral.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
            <span>Segurança Infantil Absoluta</span>
          </div>
          <h3 className="text-xl font-black font-display text-white">
            Sem anúncios, sem riscos
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Diferente de plataformas públicas de vídeo que sugerem conteúdos inapropriados através de algoritmos invasivos, a LuzKids possui curadoria 100% manual e aprovada por famílias cristãs.
          </p>
        </div>
      </div>

      {/* Why Choose LuzKids Section */}
      <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-black font-display text-white">Por que escolher a LuzKids?</h2>
          <p className="text-xs text-slate-400">Cinco compromissos claros com cada pai e mãe</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 text-xs">
          <div className="space-y-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">1</div>
            <h4 className="font-bold text-white text-sm">Fidelidade aos Princípios</h4>
            <p className="text-slate-400 leading-relaxed">Histórias bíblicas e fábulas éticas fiéis às Sagradas Escrituras e ao bom caráter humano.</p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">2</div>
            <h4 className="font-bold text-white text-sm">Pagamento Local Angolano</h4>
            <p className="text-slate-400 leading-relaxed">Facilidade total com Multicaixa Express e cartões nacionais sem taxas ocultas em divisas.</p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">3</div>
            <h4 className="font-bold text-white text-sm">Sem Assinaturas Forçadas</h4>
            <p className="text-slate-400 leading-relaxed">Compre apenas os filmes que desejar. Eles são seus para sempre, sem mensalidades que acumulam.</p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">4</div>
            <h4 className="font-bold text-white text-sm">Controlo Parental Real</h4>
            <p className="text-slate-400 leading-relaxed">Bloqueio por PIN, limites de tempo diário e modo de dormir para noites tranquilas.</p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">5</div>
            <h4 className="font-bold text-white text-sm">Modo Viagem Offline</h4>
            <p className="text-slate-400 leading-relaxed">Descarregue para o tablet ou smartphone e mantenha os seus filhos entretidos em viagens.</p>
          </div>

          <div className="space-y-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">6</div>
            <h4 className="font-bold text-white text-sm">Língua Portuguesa Pura</h4>
            <p className="text-slate-400 leading-relaxed">Dublagens e legendas perfeitas em Português para uma dicção e vocabulário enriquecedores.</p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="text-center pt-4">
        <button
          onClick={() => navigateTo('catalog')}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 transition-all hover:scale-105"
        >
          <span>Conhecer os Filmes da Plataforma</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
