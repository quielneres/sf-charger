import axios from 'axios';

const API_URL = 'http://192.168.1.10:4000/api/cars';

export const getUserCars = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar carros:", error);
        return [];
    }
};

export const addUserCar = async (userId, carData) => {
    try {
        const response = await axios.post(`${API_URL}/${userId}/add`, carData);
        return response.data;
    } catch (error) {
        console.error("Erro ao cadastrar carro:", error);
        return { error: "Falha ao cadastrar carro" };
    }
};

export const deleteUserCar = async (carId) => {
    try {
        const response = await axios.delete(`${API_URL}/${carId}/delete`);
        return response.data;
    } catch (error) {
        console.error("Erro ao remover carro:", error);
        return { error: "Falha ao remover carro" };
    }
};
