import React, { useState } from 'react';
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  Lock, 
  ArrowRight, 
  ArrowLeft,
  QrCode,
  FileCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CheckoutScreen: React.FC = () => {
  const { 
    cart, 
    cartTotal, 
    user, 
    completeCheckout, 
    navigateTo, 
    selectedMovie 
  } = useApp();

  const [step, setStep] = useState<1 | 2>(1);
  const [paymentMethod, setPaymentMethod] = useState<'express' | 'card' | 'transfer'>('express');
  
  // Buyer Details
  const [buyerName, setBuyerName] = useState(user.name);
  const [buyerEmail, setBuyerEmail] = useState(user.email);
  const [buyerPhone, setBuyerPhone] = useState(user.phone);
  const [city, setCity] = useState(user.city || 'Luanda');

  // Payment inputs
  const [expressPhone, setExpressPhone] = useState('923 456 789');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4182');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvv, setCardCvv] = useState('834');
  const [transferProofUploaded, setTransferProofUploaded] = useState(false);

  // Processing & Simulation States
  const [isProcessing, setIsProcessing] = useState(false);
  const [simulateError, setSimulateError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const itemsToBuy = cart.length > 0 ? cart.map(i => i.movie) : [selectedMovie];
  const finalAmount = cart.length > 0 ? cartTotal : selectedMovie.price;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail || !buyerPhone) {
      setErrorMessage('Por favor preencha todos os dados de contacto.');
      return;
    }
    setErrorMessage('');
    setStep(2);
  };

  const handleFinalizePayment = () => {
    setErrorMessage('');
    setIsProcessing(true);

    setTimeout(() => {
      if (simulateError) {
        setIsProcessing(false);
        setErrorMessage('Transação rejeitada pelo Multicaixa Express (Tempo esgotado ou saldo insuficiente). Por favor tente novamente.');
      } else {
        setIsProcessing(false);
        const newOrder = completeCheckout({
          paymentMethod,
          buyerName,
          buyerEmail,
          buyerPhone,
          totalAmount: finalAmount
        });
        navigateTo('order-confirmed');
      }
    }, 1800);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Checkout Steps Stepper */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
            Finalizar Pagamento Seguro
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Ambiente encriptado de 256 bits com liquidação em Kwanzas (AOA)
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg ${step === 1 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>
            <span>1. Dados</span>
          </div>
          <span className="text-slate-600">→</span>
          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-lg ${step === 2 ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}>
            <span>2. Pagamento</span>
          </div>
        </div>
      </div>

      {/* Error message if simulated or validation failed */}
      {errorMessage && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-start gap-3 text-rose-300 text-xs animate-in fade-in">
          <AlertCircle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-bold text-rose-200">Falha na autorização do pagamento</h4>
            <p className="mt-0.5">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Loading / Processing State Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="max-w-md w-full bg-slate-900 border border-amber-500/40 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
              <span className="w-8 h-8 border-3 border-amber-400 border-t-transparent rounded-full animate-spin" />
            </div>
            <h3 className="text-xl font-black font-display text-white">A processar o seu pagamento...</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {paymentMethod === 'express' ? (
                <>
                  Enviámos uma notificação para o seu telemóvel <strong className="text-amber-400">{expressPhone}</strong>. Por favor, insira o seu PIN no <strong>Multicaixa Express</strong> para confirmar.
                </>
              ) : (
                'A validar os dados com o sistema bancário angolano...'
              )}
            </p>
            <div className="pt-2 text-[11px] text-slate-500">
              Não feche esta janela durante a validação.
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Step 1 or Step 2 */}
        <div className="lg:col-span-7 space-y-6">
          
          {step === 1 ? (
            /* Step 1: Buyer Details */
            <form onSubmit={handleProceedToPayment} className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-5">
              <div className="border-b border-slate-800 pb-3">
                <h2 className="text-base font-bold text-white">Etapa 1: Dados do Comprador</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Os comprovativos e recibos do pedido serão enviados para este e-mail.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nome Completo do Encarregado
                  </label>
                  <input
                    type="text"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      E-mail para Receção
                    </label>
                    <input
                      type="email"
                      value={buyerEmail}
                      onChange={(e) => setBuyerEmail(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Telemóvel (Angola)
                    </label>
                    <input
                      type="text"
                      value={buyerPhone}
                      onChange={(e) => setBuyerPhone(e.target.value)}
                      required
                      placeholder="+244 923 000 000"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Província / Cidade
                  </label>
                  <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-xs sm:text-sm text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Luanda">Luanda</option>
                    <option value="Benguela">Benguela</option>
                    <option value="Huambo">Huambo</option>
                    <option value="Lubango">Lubango / Huíla</option>
                    <option value="Cabinda">Cabinda</option>
                    <option value="Malanje">Malanje</option>
                    <option value="Outra Província">Outra Província</option>
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>Continuar para Método de Pagamento</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          ) : (
            /* Step 2: Payment Method */
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <h2 className="text-base font-bold text-white">Etapa 2: Escolha o Método de Pagamento</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Selecione a forma mais conveniente para si em Angola.
                  </p>
                </div>
                <button
                  onClick={() => setStep(1)}
                  className="text-xs text-amber-400 hover:underline flex items-center gap-1"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>Editar dados</span>
                </button>
              </div>

              {/* Payment Method Selector Tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                {/* Multicaixa Express */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('express')}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'express'
                      ? 'bg-amber-500/10 border-amber-500 text-white shadow-md shadow-amber-500/10'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Smartphone className={`w-5 h-5 ${paymentMethod === 'express' ? 'text-amber-400' : 'text-slate-400'}`} />
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400">
                      Mais Rápido
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Multicaixa Express</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Autorize no telemóvel</p>
                  </div>
                </button>

                {/* Cartão Bancário */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-amber-500/10 border-amber-500 text-white shadow-md shadow-amber-500/10'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <CreditCard className={`w-5 h-5 ${paymentMethod === 'card' ? 'text-amber-400' : 'text-slate-400'}`} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Cartão Bancário</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">BAI, BFA, Millennium</p>
                  </div>
                </button>

                {/* Transferência Bancária */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod('transfer')}
                  className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    paymentMethod === 'transfer'
                      ? 'bg-amber-500/10 border-amber-500 text-white shadow-md shadow-amber-500/10'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <Building2 className={`w-5 h-5 ${paymentMethod === 'transfer' ? 'text-amber-400' : 'text-slate-400'}`} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Transferência / IBAN</h4>
                    <p className="text-[10px] text-slate-400 mt-0.5">Depósito ou app bancária</p>
                  </div>
                </button>

              </div>

              {/* Method Details Input Panel */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                {paymentMethod === 'express' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-amber-400 font-semibold">
                      <span>Pagamento via Multicaixa Express</span>
                      <QrCode className="w-4 h-4 text-slate-400" />
                    </div>
                    <p className="text-xs text-slate-400">
                      Insira o seu número de telemóvel associado ao Multicaixa Express para receber o pedido de autorização imediato:
                    </p>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Número de Telemóvel Express:
                      </label>
                      <input
                        type="text"
                        value={expressPhone}
                        onChange={(e) => setExpressPhone(e.target.value)}
                        placeholder="923 000 000"
                        className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm font-mono text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'card' && (
                  <div className="space-y-3">
                    <div className="text-xs text-amber-400 font-semibold">
                      Dados do Cartão Multicaixa / Visa / Mastercard
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                        Número do Cartão:
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          Validade (MM/AA):
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-300 mb-1">
                          CVV:
                        </label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono text-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'transfer' && (
                  <div className="space-y-3 text-xs">
                    <div className="text-amber-400 font-semibold">
                      Coordenadas Bancárias da LuzKids Angola
                    </div>
                    <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 space-y-1.5 font-mono text-[11px]">
                      <div><strong className="text-slate-400">Banco:</strong> Banco Angolano de Investimentos (BAI)</div>
                      <div><strong className="text-slate-400">Beneficiário:</strong> LuzKids Entretenimento Infantil Lda.</div>
                      <div><strong className="text-slate-400">IBAN:</strong> AO06.0040.0000.1234.5678.9012.3</div>
                    </div>

                    <div>
                      <button
                        type="button"
                        onClick={() => setTransferProofUploaded(!transferProofUploaded)}
                        className={`w-full py-2.5 px-3 rounded-xl border text-center font-semibold transition-all ${
                          transferProofUploaded
                            ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400'
                            : 'bg-slate-900 border-dashed border-slate-700 text-slate-300 hover:border-amber-500'
                        }`}
                      >
                        {transferProofUploaded ? (
                          <span className="flex items-center justify-center gap-1.5">
                            <FileCheck className="w-4 h-4" />
                            Comprovativo Carregado (comprovativo.pdf)
                          </span>
                        ) : (
                          <span>+ Anexar Comprovativo de Transferência (Simular)</span>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Finalize Button */}
              <button
                type="button"
                onClick={handleFinalizePayment}
                className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <Lock className="w-4 h-4" />
                <span>Pagar {finalAmount.toLocaleString('pt-AO')} Kz e Assistir</span>
              </button>

              {/* Demonstration toggle for examiner */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span>Modo de Teste da Banca:</span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={simulateError}
                    onChange={(e) => setSimulateError(e.target.checked)}
                    className="rounded bg-slate-950 border-slate-700 text-amber-500"
                  />
                  <span>Simular Rejeição / Falha</span>
                </label>
              </div>

            </div>
          )}

        </div>

        {/* Right Summary */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Itens a Adquirir ({itemsToBuy.length})
            </h3>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {itemsToBuy.map((movie) => (
                <div key={movie.id} className="flex items-center gap-3">
                  <div className="w-12 h-16 rounded-lg overflow-hidden bg-slate-950 shrink-0">
                    <img 
                      src={movie.posterUrl} 
                      alt={movie.title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{movie.title}</h4>
                    <span className="text-[10px] text-slate-400">{movie.category} · {movie.ageRating}</span>
                  </div>
                  <span className="text-xs font-bold text-amber-400 tabular-nums">
                    {movie.price.toLocaleString('pt-AO')} Kz
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>Total dos Filmes:</span>
                <span className="text-slate-200 tabular-nums">{finalAmount.toLocaleString('pt-AO')} Kz</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>Acesso Ilimitado:</span>
                <span className="text-emerald-400 font-semibold">Incluído para Sempre</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-sm font-black text-white">
                <span>Total a Pagar:</span>
                <span className="text-lg text-amber-400 tabular-nums">{finalAmount.toLocaleString('pt-AO')} Kz</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Garantia de satisfação familiar: suporte dedicado em Luanda.</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
