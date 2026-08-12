import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/api',
});


