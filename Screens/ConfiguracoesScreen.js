import React from 'react';
import { StyleSheet, View, Text, Switch, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function ConfiguracoesScreen() {
  const { tema, temaEscuro, toggleTema } = useTheme();
  const { logout } = useAuth();

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <Text style={[styles.titulo, { color: tema.destaque }]}>Configurações</Text>

      <View style={[styles.card, { backgroundColor: tema.card, borderColor: tema.borda }]}>
        <Text style={[styles.label, { color: tema.texto }]}>Modo Escuro</Text>
        <Switch
          value={temaEscuro}
          onValueChange={toggleTema}
          trackColor={{ false: '#ccc', true: '#B59173' }}
          thumbColor={temaEscuro ? '#FEE9D3' : '#FFFFFF'}
        />
      </View>

      <TouchableOpacity
        style={[styles.botaoSair, { borderColor: '#ff6b6b' }]}
        onPress={logout}
      >
        <Text style={styles.textoBotaoSair}>Sair da Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 48 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  card: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    padding: 16, borderRadius: 10, borderWidth: 1, marginBottom: 24,
  },
  label: { fontSize: 16 },
  botaoSair: { borderWidth: 1, padding: 14, borderRadius: 10, alignItems: 'center' },
  textoBotaoSair: { color: '#ff6b6b', fontWeight: 'bold', fontSize: 15 },
});