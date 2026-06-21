import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

const TEMA_ESCURO = {
  fundo: '#1F1817',
  card: '#382622',
  borda: '#543733',
  destaque: '#B59173',
  texto: '#FEE9D3',
};

const TEMA_CLARO = {
  fundo: '#FEE9D3',
  card: '#FFFFFF',
  borda: '#B59173',
  destaque: '#543733',
  texto: '#1F1817',
};

export function ThemeProvider({ children }) {
  const [temaEscuro, setTemaEscuro] = useState(true);

  const toggleTema = () => setTemaEscuro((prev) => !prev);

  const tema = temaEscuro ? TEMA_ESCURO : TEMA_CLARO;

  return (
    <ThemeContext.Provider value={{ tema, temaEscuro, toggleTema }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}