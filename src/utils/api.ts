import axios from 'axios';

const API = axios.create({
  baseURL: 'https://influencers-campaigns-bn.onrender.com',
});

export const login = (email: string, password: string) =>
  API.post('/user/login', { email, password });

export const signUp = (name: string, email: string, password: string) =>
  API.post('/user/signup', { name, email, password });


export const getAllCampaigns = () => API.get('/campaigns');
export const getJoinedCampaigns = (token: string) =>
  API.get('/campaigns/joined', {
    headers: { Authorization: `Bearer ${token}` },
  });
