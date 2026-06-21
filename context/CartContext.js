import React, { createContext, useContext, useState } from 'react';
import { notificarStatusPedido } from '../services/notifications';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [itens, setItens] = useState([]);
  const [pedidos, setPedidos] = useState([]);

  const adicionarItem = (produto, quantidade) => {
    setItens((prev) => {
      const existente = prev.find((i) => i.id === produto.id);
      if (existente) {
        return prev.map((i) =>
          i.id === produto.id
            ? { ...i, quantidade: i.quantidade + quantidade }
            : i
        );
      }
      return [...prev, { ...produto, quantidade }];
    });
  };

  const removerItem = (id) => {
    setItens((prev) => prev.filter((i) => i.id !== id));
  };

  const limparCarrinho = () => setItens([]);

  const total = itens.reduce((soma, i) => soma + i.preco * i.quantidade, 0);

  const finalizarPedido = () => {
    if (itens.length === 0) return;

    const novoPedido = {
      id: String(Date.now()),
      numero: `#${Math.floor(1000 + Math.random() * 9000)}`,
      data: new Date().toLocaleDateString('pt-BR'),
      status: 'Em preparo',
      itens: itens.reduce((soma, i) => soma + i.quantidade, 0),
      total,
    };

    setPedidos((prev) => [novoPedido, ...prev]);
    limparCarrinho();

    notificarStatusPedido(novoPedido.numero, 'Em preparo');

    setTimeout(() => {
      atualizarStatusPedido(novoPedido.id, 'Saiu para entrega');
    }, 8000);

    setTimeout(() => {
      atualizarStatusPedido(novoPedido.id, 'Entregue');
    }, 16000);
  };

  const atualizarStatusPedido = (id, novoStatus) => {
    setPedidos((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          notificarStatusPedido(p.numero, novoStatus);
          return { ...p, status: novoStatus };
        }
        return p;
      })
    );
  };

  return (
    <CartContext.Provider
      value={{
        itens, adicionarItem, removerItem, limparCarrinho, total,
        pedidos, finalizarPedido, atualizarStatusPedido,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}