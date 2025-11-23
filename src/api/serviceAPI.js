import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API_BASE_URL = "https://kami-backend-5rs0.onrender.com";
const TOKEN_KEY = '@auth-token';

export const DEFAULT_ACCOUNT = {
    phone: '0373007856',
    password: '123',
};

const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(
    async (config) => {
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const message = error.response?.data.message || error.message || 'Có lỗi';
        return Promise.reject(new Error(message));
    }
);

export const login = async (phone, password) => {
    try {
        const response = await api.post('/auth', { phone, password });

        if (response.token) {
            await AsyncStorage.setItem(TOKEN_KEY, response.token);
        }

        return response;
    }
    catch (error) {
        console.error('Login failed', error.message);
        throw error;
    }
}

export const isLogIn = async () => {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    return token !== null;
}

export const getAllServices = async () => {
    try {
        const response = await api.get('/services');
        console.log(response);
        return response;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

export const getAllCustomer = async () => {
    try {
        const response = await api.get('/customers');
        console.log(response);
        return response;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export const getAllTransaction = async () => {
    try {
        const response = await api.get('/transactions');
        console.log(response);
        return response;
    } catch (error) {
        console.error(error.message)
        throw error;
    }
}
export const getAService = async (id) => {
    try {
        const respone = await api.get(`/services/${id}`);
        console.log(respone);
        return respone;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

export const getATransaction = async (id) => {
    try {
        const response = await api.get(`/transactions/${id}`);
        console.log(response);
        return response;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}
export const addAService = async (name, price) => {
    try {
        if (!name || !price) {
            throw new Error("Please input a name and a price");
        }
        if (price < 0) {
            throw new Error("Price must over or equal with 0")
        }

        const response = await api.post('/services', { name, price });
        console.log(response);
        return response;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

export const addACustomer = async (name, phone) => {
    try {
        if (!name || !phone) {
            throw new Error("Please input a name and a phone");
        }
        const response = await api.post('/customers', { name, phone });
        console.log(response);
        return response;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}


export const updateService = async (id, name, price) => {
    try {
        if (!id) {
            throw new Error('Id is required');
        }

        const data = {};
        if (name) data.name = name;
        if (price !== undefined && price != null) {
            if (price >= 0) {
                data.price = price;
            }
            else {
                throw new Error("Price must over or equal with 0");
            }
        }
        const response = await api.put(`/services/${id}`, data);
        console.log(response);
        return response;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};

export const deleteService = async (id) => {
    try {
        if (!id) {
            throw new Error('Id is required');
        }

        await api.delete(`/services/${id}`);
        console.log("Deleted");
    } catch (error) {
        console.error(error.message);
        throw error
    }
}

export const getToken = async () => {
    return await AsyncStorage.getItem(TOKEN_KEY);
}
export default {
    login,
    isLogIn,
    getAService,
    getAllServices,
    addAService,
    updateService,
    deleteService,
    getToken,
    DEFAULT_ACCOUNT,
    addACustomer,
    getATransaction,
    getAllCustomer,
    getAllTransaction
}