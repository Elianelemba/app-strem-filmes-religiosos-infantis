import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Smartphone,
  ShieldCheck,
  CreditCard,
  Tv
} from 'lucide-react';
import { INITIAL_FAQS } from '../data/mockData';
import { FAQItem } from '../types';

export const SupportScreen: React.FC = () => {
  const [faqs] = useState<FAQItem[]>(INITIAL_FAQS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'todas' | 'conta' | 'pagamentos' | 'compras' | 'reproducao' | 'parental'>('todas');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(INITIAL_FAQS[0].id);

  // Contact form
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const filteredFaqs = faqs.filter(f => {
    if (selectedCategory !== 'todas' && f.category !== selectedCategory) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q);
    }
    return true;
  });

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactEmail && contactMessage) {
      setMessageSent(true);
      setTimeout(() => {
        setMessageSent(false);
        setContactName('');
        setContactEmail('');
        setContactMessage('');
      }, 3500);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header & Search */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-bold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>CENTRAL DE AJUDA & FAQ</span>
        </div>
        <h1 className="text-3xl font-black font-display text-white">
          Como podemos ajudar a sua família?
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Encontre respostas rápidas sobre pagamentos com Multicaixa Express, controlo parental e reprodução.
        </p>

        <div className="relative max-w-md mx-auto">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquisar nas perguntas frequentes..."
            className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-700 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 shadow-lg"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-1 text-xs">
        <button
          onClick={() => setSelectedCategory('todas')}
          className={`px-3.5 py-1.5 rounded-xl font-semibold transition-colors ${
            selectedCategory === 'todas' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Todas
        </button>
        <button
          onClick={() => setSelectedCategory('pagamentos')}
          className={`px-3.5 py-1.5 rounded-xl font-semibold transition-colors ${
            selectedCategory === 'pagamentos' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Pagamentos & Express
        </button>
        <button
          onClick={() => setSelectedCategory('parental')}
          className={`px-3.5 py-1.5 rounded-xl font-semibold transition-colors ${
            selectedCategory === 'parental' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Controlo Parental
        </button>
        <button
          onClick={() => setSelectedCategory('reproducao')}
          className={`px-3.5 py-1.5 rounded-xl font-semibold transition-colors ${
            selectedCategory === 'reproducao' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Reprodução & Offline
        </button>
        <button
          onClick={() => setSelectedCategory('compras')}
          className={`px-3.5 py-1.5 rounded-xl font-semibold transition-colors ${
            selectedCategory === 'compras' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          Acesso & Biblioteca
        </button>
      </div>

      {/* FAQ Accordions */}
      <div className="space-y-3 max-w-3xl mx-auto">
        {filteredFaqs.map((faq) => {
          const isOpen = expandedFaq === faq.id;
          return (
            <div
              key={faq.id}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden transition-colors"
            >
              <button
                onClick={() => setExpandedFaq(isOpen ? null : faq.id)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left transition-colors hover:bg-slate-800/40"
              >
                <span className="text-sm font-bold text-white pr-4">{faq.question}</span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-amber-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-slate-800/60 animate-in fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contact Section */}
      <div className="pt-8 border-t border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Direct channels */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-display text-white">
              Fale com a nossa Equipa em Luanda
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Tem alguma dúvida sobre faturamento, ativação de conta ou sugestão de filmes bíblicos? Estamos à sua disposição todos os dias.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">WhatsApp LuzKids Angola</h4>
                  <p className="text-xs text-slate-400">+244 923 000 123 (Seg a Sáb, 8h às 19h)</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Atendimento por E-mail</h4>
                  <p className="text-xs text-slate-400">suporte@luzkids.ao</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
            <h4 className="text-sm font-bold text-white">Envie uma Mensagem</h4>

            {messageSent ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-start gap-2.5 animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
                <div>
                  <strong className="block">Mensagem enviada com sucesso!</strong>
                  <span>A nossa equipa responderá para o seu e-mail no prazo máximo de 2 horas.</span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Seu Nome</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                    placeholder="ex: Família Lemba"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Seu E-mail</label>
                  <input
                    type="email"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    required
                    placeholder="seu.email@exemplo.com"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Como podemos ajudar?</label>
                  <textarea
                    rows={3}
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    required
                    placeholder="Descreva a sua questão ou dificuldade..."
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-md transition-colors"
                >
                  Enviar Mensagem para o Suporte
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};
