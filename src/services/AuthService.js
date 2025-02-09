import axios from 'axios';

const API_URL = 'http://192.168.0.176:4000/api/auth';

export const register = async (name, email, cpf, password, phone) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { name, email, cpf, password, phone });
        return response.data;
    } catch (error) {


            if (error.response) {
                // 🔹 O servidor respondeu, mas com erro (ex: 401)
                return { error: error.response.data.error || "Usuário já cadastrado" };
            } else {
                // 🔹 O erro ocorreu antes da resposta (ex: servidor offline)
                return { error: "Erro de conexão com o servidor" };
            }

    }
};

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data; // Retorna os dados se o login for bem-sucedido
    } catch (error) {
        if (error.response) {

            console.log(error.response.data)
            // 🔹 O servidor respondeu, mas com erro (ex: 401)
            return { error: error.response.data.message ||error.response.data.error || "Falha no login" };
        } else {
            // 🔹 O erro ocorreu antes da resposta (ex: servidor offline)
            return { error: "Erro de conexão com o servidor" };
        }
    }
};

export const getProfile = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/profile`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao obter perfil:", error);
        return { error: "Erro ao buscar perfil" };
    }
};
