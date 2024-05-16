import { persistStore } from 'redux-persist';
import persistedReducers from './modules/reduxPersist';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './modules/rootReducer';
import thunk from "redux-thunk";

const store = configureStore({
    middleware: [thunk],
    reducer: persistedReducers(rootReducer)
});

export const persistor = persistStore(store);

export default store;