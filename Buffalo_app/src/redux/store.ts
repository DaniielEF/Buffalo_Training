import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { userReducer } from './slices/userSlice';
import { User } from '../components/helper/interfaces';


//Guardar el estado si esta autenticado
const saveLocalStorage = (state:User): void => {
  try {
    const serialState = JSON.stringify(state);
    localStorage.setItem('currentUser', serialState);
  } catch (error) {
      console.error('Error saving state to localStorage:', error);
  }
};

//Cargar el estado desde localStorage
const loadFromLocalStorage = (): User | undefined => {
  try {
    const serializedState = localStorage.getItem('currentUser');
    if (serializedState === null) return undefined; 
    return JSON.parse(serializedState) as User;
  } catch (error) {
      console.error('Error loading state from localStorage:', error);
      return undefined;
  }
};

// Cargar el estado persistido
const persistedState = loadFromLocalStorage();

export const store = configureStore({
    reducer: combineReducers({
        currentUser: userReducer.reducer,
      }),
      preloadedState: {
        currentUser: persistedState || undefined,
    },
      devTools: process.env.NODE_ENV === "development"
    })

    store.subscribe(() => {
      const state = store.getState().currentUser
      saveLocalStorage(state);
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;