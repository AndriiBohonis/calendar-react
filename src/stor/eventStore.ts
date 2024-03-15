import { create } from 'zustand';
import { IEventStoreType } from '../types/storeTypes';
import {
  createEvent,
  getAllEvent,
  removeEvent,
  updateStatusEvent,
} from '../api';
import { IEvent, ITodoEventVariables } from '../types';

export const useEventStore = create<IEventStoreType>()(set => ({
  loading: false,
  error: '',
  events: [],
  createEvent: async (body: IEvent) => {
    set({ loading: true });
    try {
      const event = await createEvent(body);
      set(state => ({
        ...state,
        events: [...state.events, event],
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      console.error(error);
    }
  },
  getEvents: async () => {
    set({ loading: true });
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        set({
          events: [],
        });
      } else {
        const events = await getAllEvent();
        set({
          events,
        });
      }

      set({ loading: false });
    } catch (error) {
      set({ loading: false });
      console.log(error);
    }
  },
  updateEvent: async (body: ITodoEventVariables) => {
    set({ loading: true });
    try {
      await updateStatusEvent(body);
      set(state => ({
        ...state,
        events: state.events.map(event => {
          if (event.id === body.id) {
            return { ...event, done: !event.done };
          } else {
            return event;
          }
        }),
        loading: false,
      }));
    } catch (error) {
      console.error(error);
      set(state => ({ ...state, loading: false }));
    }
  },
  removeEvent: async id => {
    set({ loading: true });
    try {
      await removeEvent(id);
      set(state => ({
        events: state.events.filter(event => event.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ loading: false });
      console.log(error);
    }
  },
}));
