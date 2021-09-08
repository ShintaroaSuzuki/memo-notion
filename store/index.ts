import { createStore, combineReducers } from 'redux';
import { userReducer } from './reducers/user';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserState } from '../types';

export type AppState = {
    user: UserState;
};

const rootReducer = combineReducers<AppState>({
    user: userReducer
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer);

export const persistor = persistStore(store);
export default store;
