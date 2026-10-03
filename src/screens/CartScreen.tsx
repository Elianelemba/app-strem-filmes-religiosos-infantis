import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Trash2, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  Sparkles, 
  ArrowLeft,
  Check,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartScreen: React.FC = () => {
  const { 
    cart, 
    removeFromCart, 
    clearCart, 
    cartSubtotal, 
    cartTotal, 
    couponCode, 
    couponDiscount, 
    applyCoupon, 
    couponError, 
    navigateTo 
  } = useApp();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponSuccess, setCouponSuccess] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (applyCoupon(inputCoupon)) {
      setCouponSuccess(true);
      setTimeout(() => setCouponSuccess(false), 3000);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black font-display text-white">O seu carrinho está vazio</h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Ainda não adicionou nenhum filme infantil à sua lista de compras. Explore o nosso catálogo e descubra histórias incríveis para a sua família!
          </p>
        </div>
        <button
          onClick={() => navigateTo('catalog')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-105"
        >
          <span>Explorar Catálogo de Filmes</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
            Carrinho de Compras
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Reveja os títulos selecionados antes de avançar para o pagamento seguro.
          </p>
        </div>

        <button
          onClick={() => navigateTo('catalog')}
          className="hidden sm:flex items-center gap-1.5 text-xs text-amber-400 hover:underline font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continuar a Comprar</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Cart Items List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 pb-2">
            <span>{cart.length} {cart.length === 1 ? 'filme selecionado' : 'filmes selecionados'}</span>
            <button
              onClick={clearCart}
              className="text-rose-400 hover:underline"
            >
              Esvaziar carrinho
            </button>
          </div>

          <div className="space-y-3">
            {cart.map((item) => (
              <div 
                key={item.movie.id}
                className="flex items-center gap-4 p-3.5 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                {/* Poster */}
                <div 
                  onClick={() => navigateTo('movie-details', item.movie)}
                  className="w-20 h-24 rounded-xl overflow-hidden bg-slate-950 shrink-0 cursor-pointer"
                >
                  <img 
                    src={item.movie.posterUrl} 
                    alt={item.movie.title}
                    className="w-full h-full object-cover object-center"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {item.movie.category}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Faixa: {item.movie.ageRating}
                    </span>
                  </div>

                  <h3 
                    onClick={() => navigateTo('movie-details', item.movie)}
                    className="text-sm font-bold text-white hover:text-amber-400 cursor-pointer truncate"
                  >
                    {item.movie.title}
                  </h3>

                  <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                    Acesso perpétuo · {item.movie.duration}
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-bold text-amber-400 tabular-nums">
                      {item.movie.price.toLocaleString('pt-AO')} Kz
                    </span>

                    <button
                      onClick={() => removeFromCart(item.movie.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Remover filme"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Guarantee pill */}
          <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Garantia LuzKids: Uma vez comprado, assista quantas vezes desejar sem mensalidade.</span>
          </div>
        </div>

        {/* Right: Order Summary & Coupon */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-xl">
            <h3 className="text-base font-bold text-white border-b border-slate-800 pb-3">
              Resumo do Pedido
            </h3>

            {/* Subtotal & Discount calculations */}
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Subtotal ({cart.length} itens):</span>
                <span className="font-semibold tabular-nums">
                  {cartSubtotal.toLocaleString('pt-AO')} Kz
                </span>
              </div>

              {couponDiscount > 0 && (
                <div className="flex items-center justify-between text-emerald-400 font-semibold">
                  <span>Desconto cupom ({couponCode}):</span>
                  <span className="tabular-nums">
                    - {(cartSubtotal - cartTotal).toLocaleString('pt-AO')} Kz
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between text-slate-400">
                <span>Taxas de processamento:</span>
                <span className="text-emerald-400 font-medium">Grátis (0 Kz)</span>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-base font-black text-white">
                <span>Total a Pagar:</span>
                <span className="text-xl text-amber-400 tabular-nums">
                  {cartTotal.toLocaleString('pt-AO')} Kz
                </span>
              </div>
            </div>

            {/* Promo Code Input */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Tem um código promocional?
              </label>
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={inputCoupon}
                  onChange={(e) => setInputCoupon(e.target.value)}
                  placeholder="ex: LUZ10"
                  className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 uppercase focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-colors shrink-0"
                >
                  Aplicar
                </button>
              </form>

              {couponError && (
                <p className="text-[11px] text-rose-400 mt-1.5">{couponError}</p>
              )}
              {couponSuccess && (
                <p className="text-[11px] text-emerald-400 mt-1.5 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  Cupom de 10% aplicado com sucesso!
                </p>
              )}
              <p className="text-[10px] text-slate-500 mt-1">
                Dica da demonstração: use o código <strong className="text-amber-400">LUZ10</strong> para 10% de desconto.
              </p>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={() => navigateTo('checkout')}
              className="w-full py-3.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.02]"
            >
              <span>Continuar para Pagamento</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Payment security info */}
            <div className="pt-2 text-center text-[11px] text-slate-400">
              <span>Pagamentos processados com segurança em Angola via Multicaixa Express e Cartão Bancário.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
