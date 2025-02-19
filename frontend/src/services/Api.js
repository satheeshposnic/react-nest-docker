import axios from 'axios';

const API_URL = 'http://localhost:5000/sales';

// Get JWT token (You can retrieve it from localStorage, context, etc.)
const getAuthToken = () => {
    // Assuming the JWT is stored in localStorage (you can adjust based on your app's logic)
    return localStorage.getItem('jwtToken'); // Replace with your logic to get the token
    //return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzM5ODY1MzA1LCJleHAiOjE3Mzk4Njg5MDV9.6Kll_a1iuMf4bdyIKqXw-G0_6Ik8bHSSDIgCLaFgKUQ';
};

// Set up an Axios instance with Bearer token in the header
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add the Authorization header to each request using the interceptor
axiosInstance.interceptors.request.use((config) => {
    const token = getAuthToken(); // Retrieve the token
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Set Authorization header
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Fetch sales data with pagination, search, and per-page records
export const getSales = async (page = 1, perPage = 10, search = '') => {
    try {
        const response = await axiosInstance.get(`${API_URL}`, {
            params: {
                page: page,                // Current page number
                perPage: perPage,          // Number of records per page
                search: search             // Search term
            }
        });
        return response.data; // Assuming response contains { sales, total }
    } catch (error) {
        console.error('Error fetching sales:', error.response?.data || error.message);
        return { sales: [], total: 0 }; // Default response structure
    }
};

// Fetch a single sale by ID
export const getOneSale = async (id) => {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data;
};

// Add a new sale
export const addSale = async (saleData) => {
    try {
        const response = await axiosInstance.post(API_URL, saleData);
        return response.data;
    } catch (error) {
        console.error('Error adding sale:', error.response?.data || error.message);
        throw error;
    }
};

// Update an existing sale
export const updateSale = async (id, saleData) => {
    try {
        const response = await axiosInstance.put(`${API_URL}/${id}`, saleData);
        return response.data;
    } catch (error) {
        console.error('Error updating sale:', error.response?.data || error.message);
        throw error;
    }
};

// Delete a sale
export const deleteSale = async (id) => {
    try {
        const response = await axiosInstance.delete(`${API_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting sale:', error.response?.data || error.message);
        throw error;
    }
};
