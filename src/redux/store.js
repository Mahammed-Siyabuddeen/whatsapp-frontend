import {applyMiddleware, compose, createStore} from 'redux'
import { reducers } from './combineReducers'
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store=createStore(reducers,composeEnhancers(compose(applyMiddleware(thunk))))