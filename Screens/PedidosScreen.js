import React from 'react';
import { StyleSheet, Text, View, FlatList,TouchableOpacity } from 'react-native';
import { useCart } from '../context/CartContext';

const statusCor = (status) => {
  if (status === 'Entregue') return '#7fb069';
  if (status === 'Cancelado') return '#ff6b6b';
  if (status === 'Saiu para entrega') return '#B59173';
  return '#e6c068';
};

export default function PedidosScreen({navigation}) {
  const { pedidos } = useCart();

  if (pedidos.length === 0) {
    return (
      <View style={styles.vazio}>
        <Text style={styles.vazioTexto}>Você ainda não fez nenhum pedido 📦</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meus Pedidos</Text>

      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardTopo}>
              <Text style={styles.numero}>{item.numero}</Text>
              <View style={[styles.badge, { borderColor: statusCor(item.status) }]}>
                <Text style={[styles.badgeTexto, { color: statusCor(item.status) }]}>
                  {item.status}
                </Text>
              </View>
            </View>
            <Text style={styles.data}>📅 {item.data}</Text>
            <Text style={styles.detalhe}>{item.itens} item(ns)</Text>
            <Text style={styles.total}>R$ {item.total.toFixed(2)}</Text>


          </View>
        )}

      />
      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate ('Home')}>
          <Text style={styles.textoBotao}>Voltar a Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1F1817', padding: 16, paddingTop: 24 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: '#B59173', marginBottom: 16, textAlign: 'center' },
  lista: { paddingBottom: 24 },
  card: { backgroundColor: '#382622', borderRadius: 10, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#543733' },
  cardTopo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  numero: { color: '#FEE9D3', fontSize: 16, fontWeight: 'bold' },
  badge: { borderWidth: 1, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 2 },
  badgeTexto: { fontSize: 11, fontWeight: 'bold' },
  data: { color: '#B59173', fontSize: 13, marginBottom: 4 },
  detalhe: { color: '#B59173', fontSize: 13, marginBottom: 8 },
  total: { color: '#FEE9D3', fontSize: 16, fontWeight: 'bold' },
  vazio: { flex: 1, backgroundColor: '#1F1817', justifyContent: 'center', alignItems: 'center', padding: 24 },
  vazioTexto: { color: '#B59173', fontSize: 16, textAlign: 'center' },
    botao: {
    width: '100%',
    backgroundColor: '#B59173',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  textoBotao: {
    color: '#1F1817',
    fontWeight: 'bold',
    fontSize: 16,
  },
});