import axios from 'axios';
import type { CreateAxiosDefaults } from 'axios';

export default axios.create({
    withCredentials: true,
    baseURL: '/api',
} as CreateAxiosDefaults);