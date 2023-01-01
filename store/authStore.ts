import { BASE_URL } from './../utils/index';
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
  allUsers: [] as IUser[],
  removeUser: () => set({ userProfile: {} }),
  fetchAllUsers: async () => {
    const { data } = await axios.get(`${BASE_URL}/api/users`);
    set({ allUsers: data });
  },
});

const useAuthStore = create(
  persist(authStore, {
    name: 'auth',
  })
);

export default useAuthStore;
