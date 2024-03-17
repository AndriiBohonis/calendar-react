import axios from 'axios';

import {
  IEvent,
  IEventResponse,
  ITodoEventVariables,
  IUser,
  IUserLogin,
  IUserRegister,
  IUserResponse,
} from '../types';

export const getToken = (token: string) => {
  localStorage.setItem('token', token);
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

axios.defaults.baseURL = 'http://localhost:8000/api/';
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const registerUser = async (body: IUserRegister) => {
  const response = await axios.post<IUserResponse>(
    'auth/register',
    body,
    config
  );
  return response.data;
};
export const loginUser = async (body: IUserLogin) => {
  const response = await axios.post<IUserResponse>('auth/login', body, config);
  return response.data;
};
export const getUser = async () => {
  const response = await axios.post<IUser>('me', config);
  return response.data;
};
export const logoutUser = async () => {
  const response = await axios.post('logout');
  return response.data;
};

export const getAllEvent = async () => {
  const response = await axios.get<IEventResponse[]>('events');
  return response.data;
};

export const createEvent = async (body: IEvent) => {
  const response = await axios.post<IEventResponse>(`events`, body);
  return response.data;
};
export const updateStatusEvent = async ({ id, done }: ITodoEventVariables) => {
  await axios.patch<IEvent[]>(`events/${id}/status`, {
    done,
  });
  return { id, done };
};

export const removeEvent = async (id: number) => {
  const response = await axios.delete(`events/${id}`);
  return { ...response.data, id };
};
