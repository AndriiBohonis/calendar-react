import { create } from 'zustand';
import { IUserType } from '../types/storeTypes';
import { getToken, getUser, loginUser, logoutUser, registerUser } from '../api';
import { AxiosError } from 'axios';

export const useSUserStore = create<IUserType>()(set => ({
  user: null,
  error: null,
  loading: false,
  isUser: false,
  registerUser: async body => {
    set({ loading: true });
    try {
      const data = await registerUser(body);
      getToken(data.token);

      set({
        user: data.user,
        isUser: true,
        loading: false,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        set({ loading: false, error: error });
      }
    }
  },
  loginUser: async body => {
    set({ loading: true });
    try {
      const data = await loginUser(body);
      getToken(data.token);

      set({
        user: data.user,
        isUser: true,
        loading: false,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        set({ loading: false, error: error });
      }
    }
  },
  getUser: async () => {
    set({ loading: true });
    try {
      const user = await getUser();
      if (user.name)
        set({
          user,
          isUser: true,
          loading: false,
        });
    } catch (error) {
      set({ loading: false });
      if (error instanceof AxiosError) {
        set({ loading: false, error: error });
      }
    }
  },
  logoutUser: async () => {
    set({ loading: true });
    try {
      await logoutUser();
      localStorage.removeItem('token');
      getToken('');
      set({
        user: null,
        isUser: false,
        loading: false,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        set({ loading: false, error: error });
      }
    }
  },
}));
