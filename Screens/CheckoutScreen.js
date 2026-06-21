import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, Animated, ActivityIndicator,
} from 'react-native';
import { useCart } from '../context/CartContext';
import { buscarEnderecoPorCep } from '../services/cepService';

const METODOS_PAGAMENTO = ['Cartão de Crédito', 'PIX', 'Dinheiro'];

export default function CheckoutScreen({ navigation }) {
  const { itens, total, finalizarPedido } = useCart();

  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [metodoPagamento, setMetodoPagamento] = useState('');
  const [erro, setErro] = useState('');
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [confirmando, setConfirmando] = useState(false);

  const fadeAnim = useRef(new Animated.Value(1)).current;


  useEffect(() => {
    if (cep.replace(/\D/g, '').length === 8) {
      handleBuscarCep();
    }
  }, [cep]);

  const handleBuscarCep = async () => {
    if (cep.replace(/\D/g, '').length !== 8) {
      setErro('Digite um CEP válido com 8 números.');
      return;
    }
    setErro('');
    setBuscandoCep(true);
    try {
      const dados = await buscarEnderecoPorCep(cep);
      setEndereco(`${dados.logradouro}, ${dados.bairro} - ${dados.cidade}/${dados.uf}`);
    } catch (e) {
      setErro(e.message);
    } finally {
      setBuscandoCep(false);
    }
  };


  const confirmarPedido = () => {
    if (!endereco.trim() || !numero.trim()) {
      setErro('Informe o CEP e o número para entrega.');
      return;
    }
    if (!metodoPagamento) {
      setErro('Selecione um método de pagamento.');
      return;
    }

    setErro('');
    setConfirmando(true);

    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start(() => {
      finalizarPedido();
      navigation.navigate('Pedidos');
    });
  };

  return (
    <Animated.ScrollView
      style={[styles.container, { opacity: fadeAnim }]}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.titulo}>Revisar Pedido</Text>

      {itens.map((item) => (
        <View key={item.id} style={styles.itemRow}>
          <Text style={styles.itemNome} numberOfLines={1}>
            {item.quantidade}x {item.nome}
          </Text>
          <Text style={styles.itemPreco}>
            R$ {(item.preco * item.quantidade).toFixed(2)}
          </Text>
        </View>
      ))}

      <View style={styles.divider} />
      <Text style={styles.total}>Total: R$ {total.toFixed(2)}</Text>
      <View style={styles.divider} />

      <Text style={styles.secao}>Endereço de Entrega</Text>

      <TextInput
        style={styles.input}
        placeholder="CEP (somente números)"
        placeholderTextColor="#B59173"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
        maxLength={8}
      />
      {buscandoCep && <ActivityIndicator color="#B59173" size="small" style={{ marginBottom: 12 }} />}
    

      <TextInput
        style={styles.input}
        placeholder="Endereço (preenchido automaticamente)"
        placeholderTextColor="#B59173"
        value={endereco}
        onChangeText={setEndereco}
        editable={!buscandoCep}
      />

      <TextInput
        style={styles.input}
        placeholder="Número e complemento"
        placeholderTextColor="#B59173"
        value={numero}
        onChangeText={setNumero}
      />

      <Text style={styles.secao}>Método de Pagamento</Text>
      <View style={styles.opcoesPagamento}>
        {METODOS_PAGAMENTO.map((metodo) => (
          <TouchableOpacity
            key={metodo}
            style={[
              styles.opcaoPagamento,
              metodoPagamento === metodo && styles.opcaoPagamentoSelecionada,
            ]}
            onPress={() => setMetodoPagamento(metodo)}
          >
            <Text
              style={[
                styles.opcaoPagamentoTexto,
                metodoPagamento === metodo && styles.opcaoPagamentoTextoSelecionado,
              ]}
            >
              {metodo}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <TouchableOpacity
        style={[styles.botao, confirmando && styles.botaoConfirmando]}
        onPress={confirmarPedido}
        disabled={confirmando}
      >
        <Text style={styles.textoBotao}>
          {confirmando ? 'Confirmando...' : 'Confirmar Pedido'}
        </Text>
      </TouchableOpacity>
    </Animated.ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#1F1817' },
  content: { 
    padding: 20, 
    paddingTop: 24, 
    paddingBottom: 48 },
  titulo: { 
    color: '#B59173', 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 16, 
    textAlign: 'center' },
  itemRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 8 },
  itemNome: { 
    color: '#FEE9D3', 
    fontSize: 14, flex: 1, 
    marginRight: 8 },
  itemPreco: { 
    color: '#FEE9D3', 
    fontSize: 14, 
    fontWeight: 'bold' },
  divider: { 
    height: 1, 
    backgroundColor: '#543733', 
    marginVertical: 16 },
  total: {
    color: '#FEE9D3', 
    fontSize: 18, 
    fontWeight: 'bold', 
    textAlign: 'right' },
  secao: { 
    color: '#B59173', 
    fontSize: 13, 
    fontWeight: 'bold', 
    textTransform: 'uppercase', 
    letterSpacing: 1, 
    marginBottom: 8, 
    marginTop: 4 },
  input: {
    borderWidth: 1, 
    borderColor: '#543733', 
    borderRadius: 8, 
    padding: 12,
    marginBottom: 16, 
    color: '#FEE9D3', 
    backgroundColor: '#382622', 
    fontSize: 14,
  },
  opcoesPagamento: { 
    gap: 8, 
    marginBottom: 16 },
  opcaoPagamento: {
    borderWidth: 1, 
    borderColor: '#543733', 
    borderRadius: 8,
    padding: 12, 
    backgroundColor: '#382622',
  },
  opcaoPagamentoSelecionada: {
    borderColor: '#B59173', 
    backgroundColor: 'rgba(181,145,115,0.2)',
  },
  opcaoPagamentoTexto: { 
    color: '#B59173', 
    fontSize: 14 
  },
  opcaoPagamentoTextoSelecionado: { 
    color: '#FEE9D3', 
    fontWeight: 'bold' },
  erro: { 
    color: '#ff6b6b', 
    textAlign: 'center', 
    marginBottom: 12 },
  botao: { 
    backgroundColor: '#B59173', 
    padding: 16, 
    borderRadius: 10, 
    alignItems: 'center' },
  botaoBuscar:{

    },
  textoBotao: { 
    color: '#1F1817', 
    fontWeight: 'bold', 
    fontSize: 16 },
});