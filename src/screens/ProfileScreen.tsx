import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  ShieldCheck, 
  Lock, 
  Film, 
  Bell, 
  LogOut, 
  Check, 
  Smartphone,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProfileScreen: React.FC = () => {
  const { user, updateUser, logoutUser, navigateTo, purchasedMovieIds, orders } = useApp();

  const [activeTab, setActiveTab] = useState<'personal' | 'payments' | 'security' | 'preferences'>('personal');
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [city, setCity] = useState(user.city || 'Luanda');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Security
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [passSuccess, setPassSuccess] = useState(false);

  const handleSavePersonal = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, email, phone, city });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPass) {
      setPassSuccess(true);
      setCurrentPass('');
      setNewPass('');
      setTimeout(() => setPassSuccess(false), 2500);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Profile Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/20 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-20 h-20 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black text-2xl font-display shadow-lg">
            {user.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
          </div>
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
              <h1 className="text-xl sm:text-2xl font-black font-display text-white">{user.name}</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Familiar
              </span>
            </div>
            <p className="text-xs text-slate-400">{user.email} · {user.phone}</p>
            <div className="mt-2 flex items-center justify-center sm:justify-start gap-2 text-[11px] text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Cliente LuzKids Angola · {purchasedMovieIds.length} títulos na biblioteca</span>
            </div>
          </div>
        </div>

        <button
          onClick={logoutUser}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-rose-950/40 text-slate-300 hover:text-rose-400 border border-slate-700/80 text-xs font-semibold transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Terminar Sessão</span>
        </button>
      </div>

      {/* Main Grid: Navigation tabs + Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Nav menu */}
        <div className="lg:col-span-4 space-y-2">
          <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-1">
            <button
              onClick={() => setActiveTab('personal')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition-colors text-left ${
                activeTab === 'personal'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <User className="w-4 h-4" />
                <span>Dados Pessoais</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            <button
              onClick={() => navigateTo('parental-control')}
              className="w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors text-left"
            >
              <div className="flex items-center gap-2.5 text-amber-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Controlo Parental (PIN)</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            <button
              onClick={() => navigateTo('orders-history')}
              className="w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 transition-colors text-left"
            >
              <div className="flex items-center gap-2.5">
                <Film className="w-4 h-4" />
                <span>Histórico de Compras ({orders.length})</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            <button
              onClick={() => setActiveTab('payments')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition-colors text-left ${
                activeTab === 'payments'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-4 h-4" />
                <span>Métodos de Pagamento</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>

            <button
              onClick={() => setActiveTab('security')}
              className={`w-full flex items-center justify-between p-3 rounded-xl text-xs font-semibold transition-colors text-left ${
                activeTab === 'security'
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Lock className="w-4 h-4" />
                <span>Segurança & Palavra-passe</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>
          </div>
        </div>

        {/* Right Tab Content */}
        <div className="lg:col-span-8">
          
          {/* Tab 1: Personal Data */}
          {activeTab === 'personal' && (
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">Dados da Conta Familiar</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Atualize as informações do encarregado de educação da família.
                </p>
              </div>

              {savedSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4" />
                  <span>Dados atualizados com sucesso!</span>
                </div>
              )}

              <form onSubmit={handleSavePersonal} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      E-mail
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Telemóvel
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Cidade / Província
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
                  >
                    Guardar Alterações
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tab 2: Saved Payments */}
          {activeTab === 'payments' && (
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">Métodos de Pagamento Guardados</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Facilite a compra dos próximos filmes infantis com um clique.
                </p>
              </div>

              <div className="space-y-3">
                {user.savedPaymentMethods.map((m) => (
                  <div key={m.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center gap-3">
                      {m.type === 'express' ? (
                        <Smartphone className="w-5 h-5 text-amber-400" />
                      ) : (
                        <CreditCard className="w-5 h-5 text-sky-400" />
                      )}
                      <div>
                        <h4 className="text-xs font-bold text-white">{m.label}</h4>
                        <span className="text-[11px] text-slate-400 font-mono">{m.lastDigits}</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-emerald-400 font-semibold">Ativo</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigateTo('checkout')}
                className="text-xs text-amber-400 hover:underline font-semibold"
              >
                + Adicionar novo método de pagamento
              </button>
            </div>
          )}

          {/* Tab 3: Security */}
          {activeTab === 'security' && (
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">Alterar Palavra-passe</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Mantenha a sua conta protegida com uma senha forte.
                </p>
              </div>

              {passSuccess && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  <span>Palavra-passe alterada com sucesso!</span>
                </div>
              )}

              <form onSubmit={handleSaveSecurity} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Palavra-passe Atual
                  </label>
                  <input
                    type="password"
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nova Palavra-passe
                  </label>
                  <input
                    type="password"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                    required
                    placeholder="Mínimo 6 caracteres"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-colors"
                  >
                    Atualizar Palavra-passe
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
