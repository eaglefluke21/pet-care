import { configureStore, createSlice } from '@reduxjs/toolkit';

const favoriteBreedsSlice = createSlice({
  name: 'favoriteBreeds',
  initialState: [],
  reducers: {
    addFavoriteBreed: (state, action) => {
      console.log('Adding favorite breed:', action.payload);
      state.push(action.payload);
    },
    removeFavoriteBreed: (state, action) => {
      console.log('Removing favorite breed:', action.payload);
      return state.filter(breed => breed._id !== action.payload);
    },
  },
});

export const { addFavoriteBreed, removeFavoriteBreed } = favoriteBreedsSlice.actions;

const store = configureStore({
  reducer: {
    favoriteBreeds: favoriteBreedsSlice.reducer,
  },
});

export default store;
