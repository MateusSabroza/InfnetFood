import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const USUARIOS = [
  { email: 'admin@admin.com', senha: 'admin123', nome: 'Admin'  , telefone: '(21) 98765-4321',
  endereco: 'Rua das Flores, 123 - Centro, Rio de Janeiro - RJ',
  avatar: 'https://images.pexels.com/photos/11628260/pexels-photo-11628260.jpeg' },
  { email: 'user@user.com', senha: '123456', nome: 'Usuário Teste', telefone: '(21) 99852-1153',
  endereco: 'Av. Rio Branco, 3 - Centro, Rio de Janeiro - RJ',
  avatar: 'https://images.pexels.com/photos/10412749/pexels-photo-10412749.jpeg'  },
];

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);

  const login = (email, senha) => {
    const encontrado = USUARIOS.find(
      (u) => u.email === email.trim() && u.senha === senha.trim()
    );
    if (encontrado) {
      setUsuario(encontrado);
      return true;
    }
    return false;
  };

  const logout = () => setUsuario(null);

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}