import { persistStore } from 'redux-persist';
import {
  configureStore,
  getDefaultMiddleware,
  StoreEnhancer,
} from '@reduxjs/toolkit';
import { createInjectorsEnhancer } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';

import { createReducer } from './reducers';

export function configureAppStore() {
  const reduxSagaMonitorOptions = {};
  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const { run: runSaga } = sagaMiddleware;

  // Create the store with saga middleware
  const middlewares = [sagaMiddleware];

  const enhancers = [
    createInjectorsEnhancer({
      createReducer,
      runSaga,
    }),
  ] as StoreEnhancer[];

  const reducer = createReducer();

  const store = configureStore({
    reducer: reducer,
    middleware: [
      ...getDefaultMiddleware({
        serializableCheck: false,
      }),
      ...middlewares,
    ],
    devTools: process.env.NODE_ENV !== 'production',
    enhancers,
  });

  const persistor = persistStore(store);

  return { store, persistor };
}
