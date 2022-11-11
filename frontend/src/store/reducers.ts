/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { InjectedReducersType } from 'utils/types/injector-typings';

const persistConfig = {
  key: 'root',
  storage,
};

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  // Initially we don't have any injectedReducers, so returning identity function to avoid the error
  if (Object.keys(injectedReducers).length === 0) {
    return persistReducer(persistConfig, state => state);
  } else {
    const combinedReducers = combineReducers({ ...injectedReducers });
    const persistedReducer = persistReducer(persistConfig, combinedReducers);
    return persistedReducer;
  }
}
