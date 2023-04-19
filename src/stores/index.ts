import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import authReducer from './auth/slice'
import walletReducer from './wallet/slice'

const reducer = combineReducers({
  authReducer,
  walletReducer
})

const store = configureStore({
  reducer,
})

export default store;
