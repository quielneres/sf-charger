import axios from 'axios';

const API_URL = "http://192.168.0.176:4000/api/wallet"; // Ajuste para seu backend

// 🔹 Obtém o saldo da carteira do usuário
export const getWalletBalance = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}/balance`);
        return response.data.balance; // Retorna o saldo disponível
    } catch (error) {
        console.error("Erro ao buscar saldo da carteira:", error);
        return 0; // Retorna 0 em caso de erro
    }
};

// 🔹 Adiciona saldo na carteira do usuário
export const addFunds = async (userId, amount, paymentMethod) => {
    try {
        const response = await axios.post(`${API_URL}/${userId}/add-funds`, {
            amount,
            paymentMethod
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao adicionar saldo na carteira:", error);
        return { error: "Falha ao processar pagamento" };
    }
};

// 🔹 Verifica se o usuário tem um cartão de crédito cadastrado
export const checkCreditCard = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}/credit-card`);
        return response.data.hasCard; // Retorna `true` se o cartão estiver cadastrado
    } catch (error) {
        console.error("Erro ao verificar cartão de crédito:", error);
        return false;
    }
};

// 🔹 Adiciona um novo cartão de crédito
export const addCreditCard = async (userId, cardDetails) => {
    try {
        const response = await axios.post(`${API_URL}/${userId}/add-credit-card`, cardDetails);
        return response.data;
    } catch (error) {
        console.error("Erro ao adicionar cartão de crédito:", error);
        return { error: "Falha ao adicionar cartão" };
    }
};
