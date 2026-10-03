import React from 'react';
import { Sparkles, Shield, HeartHandshake, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs mt-16">
      {/* Trust & Values Bar */}
      <div className="border-b border-slate-800/60 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <Shield className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Ambiente 100% Protegido</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Livre de anúncios, algoritmos invasivos ou conteúdos impróprios. Cada filme é curado com amor e princípios bíblicos.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Valores para Toda a Vida</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Histórias cativantes sobre amor, perdão, fé, amizade e coragem para fortalecer o caráter dos pequenos.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5 text-sky-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white mb-1">Acesso Perpétuo</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Ao adquirir um filme, ele é seu para sempre na biblioteca da família. Assista na TV, tablet ou telemóvel quando quiser.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-600 to-amber-300 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" />
              </div>
              <span className="font-display font-black text-lg text-white">
                Luz<span className="text-amber-400">Kids</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              A plataforma digital de streaming e filmes infantis cristãos pensada com amor para famílias angolanas e lusófonas. Histórias que ensinam, inspiram e aproximam.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-300">
                🇦🇴 Angola
              </div>
              <div className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] font-semibold text-slate-300">
                Multicaixa Express
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">Explorar</h5>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-amber-400 transition-colors">
                  Início
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalog')} className="hover:text-amber-400 transition-colors">
                  Todos os Filmes
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('promotions')} className="hover:text-amber-400 transition-colors">
                  Ofertas Especiais
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('library')} className="hover:text-amber-400 transition-colors">
                  Minha Biblioteca
                </button>
              </li>
            </ul>
          </div>

          {/* Parents & Trust */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">Área dos Pais</h5>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigateTo('parental-control')} className="hover:text-amber-400 transition-colors">
                  Controlo Parental (PIN)
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('profile')} className="hover:text-amber-400 transition-colors">
                  Gerir Conta da Família
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('orders-history')} className="hover:text-amber-400 transition-colors">
                  Recibos e Compras
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-amber-400 transition-colors">
                  Valores e Curadoria
                </button>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300">Apoio ao Cliente</h5>
            <ul className="space-y-2.5">
              <li>
                <button onClick={() => navigateTo('support')} className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <span>suporte@luzkids.ao</span>
                </button>
              </li>
              <li className="flex items-center gap-1.5 text-slate-400">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+244 923 000 123 (WhatsApp)</span>
              </li>
              <li className="flex items-center gap-1.5 text-slate-500">
                <MapPin className="w-3.5 h-3.5" />
                <span>Luanda, Angola</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 mt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © 2026 LuzKids. Todos os direitos reservados. "Histórias que ensinam, inspiram e aproximam."
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigateTo('about')} className="hover:text-slate-400">Sobre nós</button>
            <span>·</span>
            <button onClick={() => navigateTo('support')} className="hover:text-slate-400">Termos de Uso</button>
            <span>·</span>
            <button onClick={() => navigateTo('support')} className="hover:text-slate-400">Privacidade</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
