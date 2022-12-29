import create from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

export interface IUser {
  _id: string;
  _type: any;
  userName: string;
  image: string;
}

const authStore = (set: any) => ({
  userProfile: {} as IUser,
  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: {} }),
});

const useAuthStore = create(
  persist(authStore, {
    name: 'auth',
  })
);

export default useAuthStore;
