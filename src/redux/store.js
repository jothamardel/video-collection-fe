import { legacy_createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session'
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './rootReducer';

const middleWares =  [thunk];

if (process.env.NODE_ENV === 'development') {
	console.log("Development======>", process.env.NODE_ENV === "development");
	console.log("Production======>", process.env.NODE_ENV === "production");
	console.log(process.env.NODE_ENV);
	middleWares.push(logger);
}

const persistConfig =  {
	key: 'root',
	storage: storageSession,
	whitelist: ['products', 'user', 'settings']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export let store = legacy_createStore(persistedReducer, applyMiddleware(...middleWares));
export let persistor = persistStore(store);
