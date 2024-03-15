import { AxiosError } from 'axios';
import {
  IEvent,
  IEventResponse,
  ITodoEventVariables,
  IUser,
  IUserLogin,
  IUserRegister,
} from '.';

export interface IUserType {
  user: IUser | null;
  error: AxiosError | null;
  loading: boolean;
  isUser: boolean;
  loginUser: (body: IUserLogin) => Promise<void>;
  registerUser: (body: IUserRegister) => Promise<void>;
  getUser: () => Promise<void>;
  logoutUser: () => Promise<void>;
}

export interface IEventStoreType {
  events: IEventResponse[];
  error: AxiosError | null;
  loading: boolean;
  createEvent: (body: IEvent) => Promise<void>;
  getEvents: () => Promise<void>;
  updateEvent: (body: ITodoEventVariables) => Promise<void>;
  removeEvent: (id: number) => Promise<void>;
}
