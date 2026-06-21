import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { useCart } from '../context/CartContext';




export default function CarrinhoScreen({ navigation }) {
  const { itens, removerItem, total, limparCarrinho, finalizarPedido } = useCart();

  if (itens.length === 0) {
    return (
      <View style={styles.vazio}>
        <Text style={styles.vazioTexto}>Seu carrinho está vazio 🛒</Text>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.textoBotao}>Ver Categorias</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meu Carrinho</Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagem }} style={styles.imagem} />
            <View style={styles.info}>
              <Text style={styles.nome} numberOfLines={1}>{item.nome}</Text>
              <Text style={styles.detalhe}>
                {item.quantidade}x R$ {item.preco.toFixed(2)}
              </Text>
              <Text style={styles.subtotal}>
                R$ {(item.preco * item.quantidade).toFixed(2)}
              </Text>
            </View>
            <TouchableOpacity onPress={() => removerItem(item.id)} style={styles.btnRemover}>
              <Text style={styles.btnRemoverTexto}>✕</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.rodape}>
        <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Checkout')}>
          <Text style={styles.textoBotao}>Finalizar Pedido</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={limparCarrinho}>
          <Text style={styles.limpar}>Limpar carrinho</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1817',
    padding: 16,
    paddingTop: 24,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#B59173',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#382622',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#543733',
    overflow: 'hidden',
    alignItems: 'center',
  },
  imagem: {
    width: 70,
    height: 70,
  },
  info: {
    flex: 1,
    padding: 10,
  },
  nome: {
    color: '#FEE9D3',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detalhe: {
    color: '#B59173',
    fontSize: 12,
    marginBottom: 2,
  },
  subtotal: {
    color: '#FEE9D3',
    fontSize: 14,
    fontWeight: 'bold',
  },
  btnRemover: {
    padding: 14,
  },
  btnRemoverTexto: {
    color: '#ff6b6b',
    fontSize: 18,
  },
  rodape: {
    borderTopWidth: 1,
    borderTopColor: '#543733',
    paddingTop: 16,
    marginTop: 8,
  },
  total: {
    color: '#FEE9D3',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  botao: {
    backgroundColor: '#B59173',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  textoBotao: {
    color: '#1F1817',
    fontWeight: 'bold',
    fontSize: 16,
  },
  limpar: {
    color: '#B59173',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  vazio: {
    flex: 1,
    backgroundColor: '#1F1817',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    gap: 20,
  },
  vazioTexto: {
    color: '#B59173',
    fontSize: 16,
  },
});