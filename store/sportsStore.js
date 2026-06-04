import { create } from 'zustand';
import { fetchSports } from '../services/api';

const useSportsStore = create((set) => ({
  sports: [],
  loading: false,
  error: null,

  loadSports: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchSports();
      set({ sports: data, loading: false });
    } catch (_err) {
      set({ error: 'Impossible de charger les sports', loading: false });
    }
  },

  favorites: [],

  addFavorite: (id) => set((state) => ({
    favorites: [...state.favorites, id]
  })),

  removeFavorite: (id) => set((state) => ({
    favorites: state.favorites.filter((favId) => favId !== id)
  })),

  isFavorite: (id) => {
    return false;
  },
}));

export default useSportsStore;