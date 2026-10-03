import React, { useState } from 'react';
import { Sparkles, ArrowRight, ArrowLeft, Shield, Users, BookOpen, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { familyWatching } from '../data/mockData';
import heroDaniel from '../assets/images/hero_daniel_courage_1791063288181.jpg';
import movieNoahsArk from '../assets/images/movie_noahs_ark_1791063299533.jpg';

export const OnboardingScreen: React.FC = () => {
  const { navigateTo } = useApp();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'Histórias que ensinam',
      badge: 'Fé e Princípios Cristãos',
      description: 'Filmes infantis cuidadosamente selecionados que transmitem virtudes essenciais: amor ao próximo, amizade sincera, respeito aos mais velhos, perdão e coragem espiritual.',
      image: heroDaniel,
      icon: BookOpen,
      iconColor: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    },
    {
      title: 'Diversão para toda a família',
      badge: 'Momentos Preciosos Juntos',
      description: 'Crie memórias afetuosas reunindo pais e filhos na sala. Canções alegres e aventuras bíblicas emocionantes que prendem a atenção das crianças e aquecem o coração dos pais.',
      image: familyWatching,
      icon: Users,
      iconColor: 'text-sky-400 bg-sky-500/10 border-sky-500/20'
    },
    {
      title: 'Conteúdo seguro para os seus filhos',
      badge: 'Paz de Espírito para os Pais',
      description: 'Esqueça preocupações com vídeos impróprios ou publicidade invasiva. Na LuzKids, 100% do catálogo possui curadoria ética rigorosa e suporte a PIN parental.',
      image: movieNoahsArk,
      icon: Shield,
      iconColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    }
  ];

  const current = steps[currentStep];
  const IconComponent = current.icon;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      navigateTo('home');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-6">
      <div className="max-w-3xl w-full bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md relative overflow-hidden">
        
        {/* Top Header & Skip */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" />
            </div>
            <span className="font-display font-extrabold text-sm text-white">LuzKids Onboarding</span>
          </div>

          <button
            onClick={() => navigateTo('home')}
            className="text-xs font-semibold text-slate-400 hover:text-amber-400 transition-colors py-1 px-2"
          >
            Pular Apresentação
          </button>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Visual Container */}
          <div className="relative aspect-video sm:aspect-square rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner group">
            <img 
              src={current.image} 
              alt={current.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
            
            {/* Step floating badge */}
            <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-md px-3 py-1 rounded-xl border border-slate-700/60 text-[11px] font-bold text-amber-400">
              Passo {currentStep + 1} de {steps.length}
            </div>
          </div>

          {/* Texts & Info */}
          <div className="flex flex-col justify-between h-full space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className={`p-2 rounded-xl border ${current.iconColor}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  {current.badge}
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-display font-black text-white leading-tight mb-3">
                {current.title}
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Stepper Dots Indicator */}
            <div className="pt-4 border-t border-slate-800/80">
              <div className="flex items-center gap-2 mb-6">
                {steps.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentStep(idx)}
                    className={`h-2 rounded-full transition-all ${
                      currentStep === idx 
                        ? 'w-8 bg-amber-500' 
                        : 'w-2 bg-slate-700 hover:bg-slate-600'
                    }`}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {currentStep > 0 && (
                  <button
                    onClick={prevStep}
                    className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    title="Voltar"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={nextStep}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02]"
                >
                  <span>{currentStep === steps.length - 1 ? 'Começar Agora' : 'Continuar'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
