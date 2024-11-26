import {configureStore, combineReducers} from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import photosReducer from './slices/photoSlice';
import queryReducer from './slices/querySlice';

export type RootState = ReturnType<typeof store.getState>

const photosPersistConfig = {
  key: 'photos',
  storage,
  blacklist: ['photos', 'showedPhotos'], // Исключаем только photos
};

// Оборачиваем photosReducer в persistReducer
const persistedPhotosReducer = persistReducer(photosPersistConfig, photosReducer);

// Главный rootReducer
const rootReducer = combineReducers({
    photosReducer: persistedPhotosReducer, // Используем обернутый редюсер
    queryReducer: queryReducer,
});

// Общая конфигурация для корня
const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: [], // Ничего не исключаем здесь
};

// Оборачиваем rootReducer
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

// Создаем store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }),
});

export const persistor = persistStore(store);
export default store;