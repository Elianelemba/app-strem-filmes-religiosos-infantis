import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  Clock, 
  Moon, 
  AlertTriangle, 
  Check, 
  Eye, 
  EyeOff,
  History,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AgeRating } from '../types';

export const ParentalControlScreen: React.FC = () => {
  const { user, updateUser } = useApp();

  const [enabled, setEnabled] = useState(user.parentalControlEnabled);
  const [pin, setPin] = useState(user.parentalPin);
  const [inputPin, setInputPin] = useState(user.parentalPin);
  const [isPinVisible, setIsPinVisible] = useState(false);
  const [maxAge, setMaxAge] = useState<AgeRating>(user.maxAgeRating);
  const [timeLimit, setTimeLimit] = useState(user.dailyScreenTimeLimitMinutes);
  const [bedTimeActive, setBedTimeActive] = useState(user.bedTimeActive);
  const [bedTimeStart, setBedTimeStart] = useState(user.bedTimeStart);
  const [bedTimeEnd, setBedTimeEnd] = useState(user.bedTimeEnd);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const sampleChildHistory = [
    { title: 'Daniel e a Coragem', time: 'Hoje, 14:15', minutes: 35 },
    { title: 'A Arca de Noé e o Grande Arco-Íris', time: 'Ontem, 16:30', minutes: 40 },
    { title: 'Canções de Louvor: O Jardim Encantado', time: '01 Out, 10:00', minutes: 25 },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      parentalControlEnabled: enabled,
      parentalPin: inputPin,
      maxAgeRating: maxAge,
      dailyScreenTimeLimitMinutes: timeLimit,
      bedTimeActive: bedTimeActive,
      bedTimeStart: bedTimeStart,
      bedTimeEnd: bedTimeEnd
    });
    setPin(inputPin);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const ageOptions: { value: AgeRating; label: string; desc: string }[] = [
    { value: 'Livre', label: 'Livre', desc: 'Bebês e todas as idades (conteúdos muito suaves)' },
    { value: '+3', label: '+3 Anos', desc: 'Primeira infância com canções e histórias bíblicas simples' },
    { value: '+6', label: '+6 Anos', desc: 'Aventuras e lições morais mais dinâmicas' },
    { value: '+10', label: '+10 Anos', desc: 'Histórias completas com contextos épicos' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Segurança Familiar</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
            Controlo Parental
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Defina limites de tempo, restrinja classificações etárias e proteja as crianças com o seu PIN de 4 dígitos.
          </p>
        </div>

        {/* Master Toggle */}
        <div className="flex items-center gap-3 bg-slate-900 px-4 py-2.5 rounded-2xl border border-slate-800">
          <span className="text-xs font-semibold text-slate-300">
            {enabled ? 'Controlo Ativo' : 'Controlo Desativado'}
          </span>
          <button
            type="button"
            onClick={() => setEnabled(!enabled)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              enabled ? 'bg-amber-500' : 'bg-slate-700'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-slate-950 transition-transform ${
                enabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2.5 animate-in fade-in">
          <Check className="w-4 h-4" />
          <span>Configurações do Controlo Parental atualizadas com sucesso!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Section 1: Parental PIN */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2.5 text-sm font-bold text-white">
            <KeyRound className="w-4 h-4 text-amber-400" />
            <span>PIN de Segurança dos Pais</span>
          </div>
          <p className="text-xs text-slate-400">
            Este PIN de 4 dígitos é solicitado para aprovar compras, alterar configurações ou aceder a conteúdos acima da faixa restrita.
          </p>

          <div className="max-w-xs">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              PIN de 4 dígitos:
            </label>
            <div className="relative">
              <input
                type={isPinVisible ? 'text' : 'password'}
                maxLength={4}
                value={inputPin}
                onChange={(e) => setInputPin(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-lg font-mono tracking-widest text-center text-amber-400 focus:outline-none focus:border-amber-500"
              />
              <button
                type="button"
                onClick={() => setIsPinVisible(!isPinVisible)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {isPinVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <span className="text-[11px] text-slate-500 mt-1 block">PIN padrão da demonstração: 1234</span>
          </div>
        </div>

        {/* Section 2: Age Rating Limits */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2.5 text-sm font-bold text-white">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Classificação Etária Máxima Permitida</span>
          </div>
          <p className="text-xs text-slate-400">
            Filmes com classificação superior à selecionada só poderão ser abertos com a digitação do PIN parental.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {ageOptions.map((opt) => {
              const isSelected = maxAge === opt.value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setMaxAge(opt.value)}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 text-white shadow-md shadow-amber-500/10'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold text-amber-400">{opt.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-amber-400" />}
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">{opt.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Screen Time Limit & Bedtime */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Daily Screen Time */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Clock className="w-4 h-4 text-sky-400" />
              <span>Tempo Diário de Ecrã</span>
            </div>
            <p className="text-xs text-slate-400">
              Limite diário de minutos de exibição para equilíbrio saudável.
            </p>

            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-300">Tempo hoje utilizado:</span>
                <span className="font-bold text-amber-400 tabular-nums">45 min de {timeLimit} min</span>
              </div>

              {/* Progress bar of time used */}
              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div 
                  className="bg-sky-500 h-full rounded-full transition-all"
                  style={{ width: `${(45 / timeLimit) * 100}%` }}
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                {[60, 90, 120, 180].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setTimeLimit(mins)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      timeLimit === mins ? 'bg-sky-600 text-white' : 'bg-slate-950 text-slate-400 border border-slate-800'
                    }`}
                  >
                    {mins / 60}h
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bedtime Lock */}
          <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Moon className="w-4 h-4 text-purple-400" />
                <span>Horário de Dormir (Bloqueio)</span>
              </div>
              <button
                type="button"
                onClick={() => setBedTimeActive(!bedTimeActive)}
                className={`w-9 h-5 rounded-full transition-colors flex items-center p-0.5 ${
                  bedTimeActive ? 'bg-purple-600 justify-end' : 'bg-slate-800 justify-start'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-white shadow" />
              </button>
            </div>
            <p className="text-xs text-slate-400">
              Impede a reprodução de filmes durante a noite para garantir descanso.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Início do Bloqueio:
                </label>
                <input
                  type="time"
                  value={bedTimeStart}
                  onChange={(e) => setBedTimeStart(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                  Fim do Bloqueio:
                </label>
                <input
                  type="time"
                  value={bedTimeEnd}
                  onChange={(e) => setBedTimeEnd(e.target.value)}
                  className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Section 4: Child Viewing History Log */}
        <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <History className="w-4 h-4 text-amber-400" />
            <span>Histórico de Visualizações Recentes da Criança</span>
          </div>
          <p className="text-xs text-slate-400">
            Acompanhe o que os seus filhos assistiram e a duração de cada sessão.
          </p>

          <div className="space-y-2.5">
            {sampleChildHistory.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <div>
                  <h4 className="font-semibold text-white">{item.title}</h4>
                  <span className="text-[11px] text-slate-400">{item.time}</span>
                </div>
                <span className="font-mono text-amber-400">{item.minutes} min assistidos</span>
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
          >
            Guardar Definições de Controlo Parental
          </button>
        </div>

      </form>

    </div>
  );
};
