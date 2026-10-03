import React, { useState } from 'react';
import { Film, CheckCircle2, Clock, XCircle, FileText, ArrowRight, X, Printer, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OrderItem } from '../types';

export const OrdersHistoryScreen: React.FC = () => {
  const { orders, navigateTo } = useApp();
  const [selectedReceipt, setSelectedReceipt] = useState<OrderItem | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Pago':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            Pago
          </span>
        );
      case 'Pendente':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-400 bg-amber-950/80 border border-amber-800/60 px-2 py-0.5 rounded-full">
            <Clock className="w-3 h-3" />
            Pendente
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-400 bg-rose-950/80 border border-rose-800/60 px-2 py-0.5 rounded-full">
            <XCircle className="w-3 h-3" />
            Cancelado
          </span>
        );
    }
  };

  const getMethodName = (method: string) => {
    switch (method) {
      case 'express': return 'Multicaixa Express';
      case 'card': return 'Cartão Bancário';
      default: return 'Transferência Bancária';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
          <Film className="w-3.5 h-3.5" />
          <span>Faturas & Transações</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
          Histórico de Compras
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Todos os pedidos realizados pela sua família com acesso perpétuo e recibos fiscais.
        </p>
      </div>

      {/* Orders Table */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Nº Pedido</th>
                <th className="py-3.5 px-4 font-semibold">Data</th>
                <th className="py-3.5 px-4 font-semibold">Filmes Adquiridos</th>
                <th className="py-3.5 px-4 font-semibold">Valor (AOA)</th>
                <th className="py-3.5 px-4 font-semibold">Método</th>
                <th className="py-3.5 px-4 font-semibold">Estado</th>
                <th className="py-3.5 px-4 font-semibold text-right">Ação</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-4 font-mono font-bold text-amber-400">
                    {order.orderNumber}
                  </td>
                  <td className="py-4 px-4 text-slate-400">
                    {order.date}
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-white">
                      {order.movies.map(m => m.title).join(', ')}
                    </div>
                    <span className="text-[10px] text-slate-500">
                      {order.movies.length} {order.movies.length === 1 ? 'título' : 'títulos'}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-bold text-white tabular-nums">
                    {order.totalAmount.toLocaleString('pt-AO')} Kz
                  </td>
                  <td className="py-4 px-4 text-slate-300">
                    {getMethodName(order.paymentMethod)}
                  </td>
                  <td className="py-4 px-4">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => setSelectedReceipt(order)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-medium text-xs transition-colors"
                    >
                      <FileText className="w-3.5 h-3.5 text-amber-400" />
                      <span>Ver Recibo</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Digital Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
          <div className="max-w-md w-full bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl relative space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black text-xs">
                  LK
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Recibo de Compra Digital</h3>
                  <span className="text-[10px] text-slate-400">LuzKids Entretenimento Infantil Lda.</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedReceipt(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Número do Pedido:</span>
                <span className="font-mono font-bold text-amber-400">{selectedReceipt.orderNumber}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Data da Transação:</span>
                <span className="text-slate-200">{selectedReceipt.date}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Cliente Encarregado:</span>
                <span className="font-medium text-white">{selectedReceipt.buyerName}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Método de Pagamento:</span>
                <span className="text-slate-200">{getMethodName(selectedReceipt.paymentMethod)}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400">Ref. Transação:</span>
                <span className="font-mono text-slate-300">{selectedReceipt.transactionRef}</span>
              </div>

              <div className="pt-2">
                <span className="text-slate-400 font-semibold block mb-2">Filmes Incluídos:</span>
                <div className="space-y-2">
                  {selectedReceipt.movies.map(m => (
                    <div key={m.id} className="flex items-center justify-between p-2 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="font-medium text-white truncate max-w-[200px]">{m.title}</span>
                      <span className="font-bold text-amber-400 tabular-nums">{m.price.toLocaleString('pt-AO')} Kz</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-sm font-black">
                <span className="text-white">Total Liquidado:</span>
                <span className="text-amber-400 text-lg tabular-nums">
                  {selectedReceipt.totalAmount.toLocaleString('pt-AO')} Kz
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => {
                  alert('Comprovativo enviado para impressão / PDF.');
                }}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-2"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Imprimir / Salvar PDF</span>
              </button>

              <button
                onClick={() => {
                  setSelectedReceipt(null);
                  navigateTo('library');
                }}
                className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
              >
                <span>Ver na Biblioteca</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
