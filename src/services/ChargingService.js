import axios from "axios";

const API_URL = "http://192.168.0.176:4000/api/charging";


export const startCharging = async (chargerId, userId, latitude, longitude) => {
    try {
        const response = await axios.post(`${API_URL}/${chargerId}/start`, {
            userId,
            latitude,
            longitude
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao iniciar carregamento:", error.response?.data || error);
        return { error: "Falha na requisição" };
    }
};

export const stopCharging = async (chargerId) => {
    try {
        const response = await axios.post(`${API_URL}/${chargerId}/stop`);
        return response.data;
    } catch (error) {
        console.error("Erro ao parar carregamento:", error);
        return { error: "Falha na requisição" };
    }
};
