import axios from "axios";

const API_URL = "http://192.168.0.176:4000/api/chargers";




export const getChargers = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Retorna apenas os dados
    } catch (error) {
        console.error("Erro ao buscar carregadores:", error);
        return [];
    }
};

export const addCharger = async (chargerData) => {
    try {
        const response = await axios.post(API_URL, chargerData);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar carregador:", error);
        return { error: "Falha na requisição" };
    }
};



