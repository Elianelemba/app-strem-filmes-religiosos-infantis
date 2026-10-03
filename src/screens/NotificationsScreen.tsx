import React, { useState } from 'react';
import { Bell, Sparkles, Tag, Film, ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScreenName } from '../context/AppContext';

export const NotificationsScreen: React.FC = () => {
  const { 
    notifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    unreadNotificationsCount, 
    navigateTo 
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filtered = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const getIcon = (type: string) => {
    switch (type) {
      case 'promo': return <Tag className="w-4 h-4 text-amber-400" />;
      case 'new_release': return <Sparkles className="w-4 h-4 text-sky-400" />;
      case 'order': return <Film className="w-4 h-4 text-emerald-400" />;
      default: return <ShieldCheck className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
            <Bell className="w-3.5 h-3.5" />
            <span>Centro de Alertas</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
            Notificações da Família
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Novidades, ofertas exclusivas e avisos sobre o controlo parental.
          </p>
        </div>

        {unreadNotificationsCount > 0 && (
          <button
            onClick={markAllNotificationsAsRead}
            className="text-xs text-amber-400 hover:underline font-semibold"
          >
            Marcar todas como lidas
          </button>
        )}
      </div>

      {/* Filter pills */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
            filter === 'all'
              ? 'bg-amber-500 text-slate-950 font-bold'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Todas ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
            filter === 'unread'
              ? 'bg-amber-500 text-slate-950 font-bold'
              : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Não lidas ({unreadNotificationsCount})
        </button>
      </div>

      {/* Notifications list */}
      <div className="space-y-3">
        {filtered.length > 0 ? (
          filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                markNotificationAsRead(item.id);
                if (item.targetScreen) navigateTo(item.targetScreen as ScreenName);
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-4 ${
                !item.read
                  ? 'bg-slate-900/90 border-amber-500/40 shadow-lg shadow-amber-500/5'
                  : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/70'
              }`}
            >
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 shrink-0 mt-0.5">
                {getIcon(item.type)}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className={`text-sm font-bold ${!item.read ? 'text-white' : 'text-slate-300'}`}>
                    {item.title}
                  </h3>
                  <span className="text-[11px] text-slate-500 shrink-0">{item.timeAgo}</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.description}
                </p>

                {item.targetScreen && (
                  <div className="mt-2 flex items-center gap-1 text-[11px] text-amber-400 font-semibold">
                    <span>Ver detalhes</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-slate-900/30 rounded-2xl border border-slate-800 text-xs text-slate-400">
            Nenhuma notificação para apresentar.
          </div>
        )}
      </div>

    </div>
  );
};
