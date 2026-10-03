import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, 
  Search, 
  ShoppingBag, 
  Bell, 
  User as UserIcon, 
  Menu, 
  X, 
  Heart, 
  Film, 
  Tv, 
  Tag, 
  ShieldCheck, 
  LogOut, 
  HelpCircle, 
  Info,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';
import { useApp, ScreenName } from '../context/AppContext';

export const Header: React.FC = () => {
  const { 
    currentScreen, 
    navigateTo, 
    cart, 
    unreadNotificationsCount, 
    notifications, 
    markAllNotificationsAsRead,
    markNotificationAsRead,
    user, 
    isLoggedIn, 
    logoutUser,
    searchQuery,
    setSearchQuery
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [quickSearchOpen, setQuickSearchOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks: { label: string; screen: ScreenName }[] = [
    { label: 'Início', screen: 'home' },
    { label: 'Filmes', screen: 'catalog' },
    { label: 'Minha Biblioteca', screen: 'library' },
    { label: 'Favoritos', screen: 'favorites' },
    { label: 'Ofertas', screen: 'promotions' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('search');
      setQuickSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-6">
          <button 
            onClick={() => navigateTo('home')}
            className="group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-lg p-1 text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-slate-950 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-amber-400 transition-colors">
                  Luz<span className="text-amber-400">Kids</span>
                </span>
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-1.5 py-0.2 rounded">
                  Seguro
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block tracking-wide -mt-0.5">
                Histórias que ensinam e inspiram
              </p>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => {
              const isActive = currentScreen === item.screen;
              return (
                <button
                  key={item.screen}
                  onClick={() => navigateTo(item.screen)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    isActive
                      ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Zone 3: Search, Notification, Cart & Profile Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Search Trigger / Inline Input */}
          <div className="relative">
            {quickSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Pesquisar por título, Bíblia ou tema..."
                    autoFocus
                    className="w-48 sm:w-64 pl-8 pr-8 py-1.5 text-xs bg-slate-900 border border-amber-500/60 rounded-full text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500 shadow-inner"
                  />
                  <Search className="w-3.5 h-3.5 text-amber-400 absolute left-2.5 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setQuickSearchOpen(false)}
                    className="absolute right-2.5 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setQuickSearchOpen(true)}
                title="Pesquisar filmes"
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              title="Notificações"
              className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              )}
            </button>

            {notificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
                <div className="p-3.5 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">Notificações</span>
                    {unreadNotificationsCount > 0 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        {unreadNotificationsCount} novas
                      </span>
                    )}
                  </div>
                  {unreadNotificationsCount > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-[11px] text-amber-400 hover:underline font-medium"
                    >
                      Marcar todas como lidas
                    </button>
                  )}
                </div>

                <div className="max-h-72 overflow-y-auto divide-y divide-slate-800/60">
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        markNotificationAsRead(item.id);
                        if (item.targetScreen) navigateTo(item.targetScreen as ScreenName);
                        setNotificationsOpen(false);
                      }}
                      className={`p-3.5 hover:bg-slate-800/50 cursor-pointer transition-colors ${
                        !item.read ? 'bg-amber-500/5' : ''
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className={`text-xs font-semibold ${!item.read ? 'text-amber-400' : 'text-slate-200'}`}>
                          {item.title}
                        </h4>
                        <span className="text-[10px] text-slate-500 shrink-0">{item.timeAgo}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="p-2 bg-slate-950/70 border-t border-slate-800 text-center">
                  <button
                    onClick={() => {
                      navigateTo('notifications');
                      setNotificationsOpen(false);
                    }}
                    className="text-xs text-slate-400 hover:text-amber-400 font-medium py-1 transition-colors"
                  >
                    Ver todas as notificações
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cart Icon & Badge */}
          <button
            onClick={() => navigateTo('cart')}
            title="Carrinho de Compras"
            className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            <ShoppingBag className="w-4 h-4" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] rounded-full bg-amber-500 text-slate-950 font-black text-[10px] flex items-center justify-center px-1 shadow-md">
                {cart.length}
              </span>
            )}
          </button>

          {/* User Profile / Menu Dropdown */}
          <div className="relative" ref={profileRef}>
            {isLoggedIn ? (
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-800/80 transition-colors focus:outline-none"
              >
                <div className="w-7 h-7 rounded-lg overflow-hidden border border-amber-500/50 bg-slate-800 flex items-center justify-center">
                  <span className="text-xs font-bold text-amber-400">FL</span>
                </div>
                <span className="text-xs font-medium text-slate-300 hidden lg:inline-block max-w-[100px] truncate">
                  {user.name.split(' ')[0]}
                </span>
              </button>
            ) : (
              <button
                onClick={() => navigateTo('login')}
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
              >
                Entrar
              </button>
            )}

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl z-50 p-2 animate-in fade-in slide-in-from-top-2">
                <div className="p-3 border-b border-slate-800/80">
                  <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                  <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                  <div className="mt-2 flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-950/50 border border-emerald-800/40 px-2 py-0.5 rounded-md">
                    <ShieldCheck className="w-3 h-3 shrink-0" />
                    <span>Controlo Parental Ativo</span>
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      navigateTo('profile');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors text-left"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                    <span>Minha Conta e Perfil</span>
                  </button>

                  <button
                    onClick={() => {
                      navigateTo('parental-control');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors text-left"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Controlo Parental</span>
                  </button>

                  <button
                    onClick={() => {
                      navigateTo('orders-history');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors text-left"
                  >
                    <Film className="w-3.5 h-3.5 text-slate-400" />
                    <span>Histórico de Compras</span>
                  </button>

                  <button
                    onClick={() => {
                      navigateTo('support');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors text-left"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                    <span>Ajuda & Suporte</span>
                  </button>
                </div>

                <div className="pt-1 border-t border-slate-800/80">
                  <button
                    onClick={() => {
                      logoutUser();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Terminar Sessão</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="grid grid-cols-2 gap-2 mb-3">
            {navLinks.map((item) => (
              <button
                key={item.screen}
                onClick={() => {
                  navigateTo(item.screen);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center justify-between p-2.5 text-xs font-semibold rounded-xl text-left ${
                  currentScreen === item.screen
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-slate-900/60 text-slate-300'
                }`}
              >
                <span>{item.label}</span>
                <ChevronRight className="w-3.5 h-3.5 opacity-50" />
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800/80 flex flex-col gap-1 text-xs">
            <button
              onClick={() => {
                navigateTo('parental-control');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 py-2 text-amber-400 font-medium"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Controlo Parental & Senha PIN</span>
            </button>
            <button
              onClick={() => {
                navigateTo('about');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 py-2 text-slate-400"
            >
              <Info className="w-4 h-4" />
              <span>Sobre a LuzKids</span>
            </button>
            <button
              onClick={() => {
                navigateTo('support');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 py-2 text-slate-400"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Suporte & Pagamentos Express</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
