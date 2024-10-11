import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Signup handling
export const signup = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, { email, password });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Google Auth
export const googleAuth = async (token) => {
    try {
        const response = await axios.post(`${API_URL}/auth/google`, { token });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
