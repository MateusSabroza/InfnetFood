import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { useCart } from '../context/CartContext';

export default function DetalhesScreen({ route, navigation }) {
  const { produto } = route.params;
  const [quantidade, setQuantidade] = useState(1);
  const { adicionarItem } = useCart();

  const [confirmado, setConfirmado] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const incrementar = () => setQuantidade((q) => q + 1);
  const decrementar = () => setQuantidade((q) => (q > 1 ? q - 1 : 1));

  const total = (produto.preco * quantidade).toFixed(2);

  const animarBotao = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.1, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();

    Animated.sequence([
      Animated.timing(opacityAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.delay(900),
      Animated.timing(opacityAnim, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  };

  const handleAdicionar = () => {
    adicionarItem(produto, quantidade);
    setConfirmado(true);
    animarBotao();
    setTimeout(() => setConfirmado(false), 1200);
    setTimeout(() => navigation.navigate('Carrinho'), 1200);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: produto.imagem }} style={styles.imagem} />

      <Text style={styles.nome}>{produto.nome}</Text>
      <Text style={styles.descricao}>{produto.descricao}</Text>

      <View style={styles.divider} />

      <Text style={styles.preco}>R$ {produto.preco.toFixed(2)} / unidade</Text>

      <View style={styles.quantidadeRow}>
        <TouchableOpacity style={styles.btnQtd} onPress={decrementar}>
          <Text style={styles.btnQtdTexto}>−</Text>
        </TouchableOpacity>
        <Text style={styles.quantidade}>{quantidade}</Text>
        <TouchableOpacity style={styles.btnQtd} onPress={incrementar}>
          <Text style={styles.btnQtdTexto}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.total}>Total: R$ {total}</Text>

      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          style={[styles.botao, confirmado && styles.botaoConfirmado]}
          onPress={handleAdicionar}
        >
          <Text style={styles.textoBotao}>
            {confirmado ? '✓ Adicionado!' : 'Adicionar ao Carrinho'}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.toast, { opacity: opacityAnim }]}>
        <Text style={styles.toastTexto}>🛒 Item adicionado ao carrinho!</Text>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1F1817' },
  content: { padding: 20, paddingBottom: 48 },
  imagem: { width: '100%', height: 220, borderRadius: 12, marginBottom: 16 },
  nome: { color: '#FEE9D3', fontSize: 22, fontWeight: 'bold', marginBottom: 8 },
  descricao: { color: '#B59173', fontSize: 14, lineHeight: 22, marginBottom: 16 },
  divider: { height: 1, backgroundColor: '#543733', marginBottom: 16 },
  preco: { color: '#B59173', fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  quantidadeRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 24, marginBottom: 16 },
  btnQtd: { backgroundColor: '#382622', borderWidth: 1, borderColor: '#543733', borderRadius: 8, width: 44, height: 44, justifyContent: 'center', alignItems: 'center' },
  btnQtdTexto: { color: '#FEE9D3', fontSize: 22, fontWeight: 'bold' },
  quantidade: { color: '#FEE9D3', fontSize: 22, fontWeight: 'bold', minWidth: 40, textAlign: 'center' },
  total: { color: '#FEE9D3', fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  botao: { backgroundColor: '#B59173', padding: 16, borderRadius: 10, alignItems: 'center' },
  botaoConfirmado: { backgroundColor: '#7fb069' },
  textoBotao: { color: '#1F1817', fontWeight: 'bold', fontSize: 16 },
  toast: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    backgroundColor: '#7fb069',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  toastTexto: { color: '#1F1817', fontWeight: 'bold' },
});