// ChargerContext.js
import React, { createContext, useState, useEffect } from 'react';

export const ChargerContext = createContext();

export const ChargerProvider = ({ children }) => {
  const [chargers, setChargers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChargers = async () => {
      try {
        // Simulação de dados (substitua pela sua lógica inicial de carregamento)
        const mockChargers = [
          {id: 1, name: 'Teste', latitude: -15.7942287, longitude: -47.8821658, description: 'Teste'},
          {id: 2, name: 'Teste2', latitude: -15.7909068, longitude: -47.8790089, description: 'Teste2'}
        ];
        setChargers(mockChargers);
      } catch (error) {
        console.error("Erro ao carregar os chargers:", error);
      } finally {
        setLoading(false);
      }
    };

    loadChargers();
  }, []); // Executa apenas uma vez na montagem do Provider

  return (
    <ChargerContext.Provider value={{ chargers, setChargers, loading }}>
      {children}
    </ChargerContext.Provider>
  );
};
