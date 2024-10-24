import axios from 'axios';

const API_URL = 'http://localhost:5001';  // Replace with your API URL

const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const login = async (mobileno) => {
    try {
        const response = await axiosInstance.post('/otp', { mobileno });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error || 'OTP Sent Failed');
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};
export const verify = async (mobileno,otp) => {
    try {
        const response = await axiosInstance.post('/otpverify', { mobileno,otp });
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error || 'OTP Sent Failed');
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};
