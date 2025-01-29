import React, { createContext, useContext, useState } from 'react';

// Criação do Contexto
const ChargerContext = createContext();

// Hook para facilitar o uso do contexto
export const useCharger = () => useContext(ChargerContext);

// Provedor do Contexto
export const ChargerProvider = ({ children }) => {
  const [status, setStatus] = useState('Idle'); // Estado global do carregador

  return (
      <ChargerContext.Provider value={{ status, setStatus }}>
        {children}
      </ChargerContext.Provider>
  );
};
