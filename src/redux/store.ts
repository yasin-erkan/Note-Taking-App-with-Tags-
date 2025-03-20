import {combineReducers, configureStore} from '@reduxjs/toolkit';
import notesReducer from './slices/notesSlice';
import tagsReducer from './slices/tagsSlice';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Set up persist configuration
const persistConfig = {
  key: 'root',
  storage,
};

// Combine reducers
const rootReducer = combineReducers({
  notes: notesReducer,
  tags: tagsReducer,
});

// Apply persist to reducers
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  // Define reducers in the store
  reducer: persistedReducer,
  // Indicate that the reducers processed by persist are not serializable
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Used to specify the type of store when using useSelector
export type RootState = ReturnType<typeof store.getState>;

// Used to specify the type of dispatch when using useDispatch
export type AppDispatch = typeof store.dispatch;

// Export the persist store
export const persistor = persistStore(store);

// Export the store
export default store;
