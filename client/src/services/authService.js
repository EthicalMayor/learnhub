import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Signup handling
export const signup = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, { email, password });
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password }, { withCredentials: true});
        return response.data;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            throw new Error(error.response.data.msg || 'Invalid Credentials. Please try again.');
        } else if (error.request) {
            // the request was made but no response was received
            throw new Error('No response received from server. Please try again later.');
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new Error('Error setting up the request. Please try again.');
        }
    }
};

export const getUserInfo = async () => {
    try {
       const response = await axios.get(`${API_URL}/user`, { withCredentials: true });
       return response.data;
    } catch (error) {
        throw new Error('Failed to get user info');
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
