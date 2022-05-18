import  {combineReducers} from 'redux'
import { AuthReducer} from './reducers/Auth' 
import {RoomReducer} from './reducers/Rooms'
export const reducers=combineReducers({AuthReducer,RoomReducer})