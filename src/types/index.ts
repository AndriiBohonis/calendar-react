export interface IUser {
  name: string;
  email: string;
}
export interface IUserLogin {
  password: string;
  email: string;
}
export interface IUserResponse {
  user: IUser;
  token: string;
}
export interface IUserRegister extends IUser {
  password: string;
}

export interface IEvent {
  event_date: string;
  description: string;
}

export interface IEventResponse extends IEvent {
  id: number;
  done: boolean;
}

export interface ITodoEventVariables {
  id: number;
  done: boolean;
}

export interface IEventCurrentDay {
  event_date: string;
  todaysEvents: IEventResponse[];
}
