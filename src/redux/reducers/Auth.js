import { ADD_TO_CONTACTS, ALL_USERS, AUTH, CALLING_USER, FETCH_ROOM, INCOMMING_CALL, LOGOUT, SET_LOADING, SOCKET_IO_CONNECTION, UPDATE_PROFILE } from "../constants/actionType";
import io from 'socket.io-client'
const initialState={
    user:JSON.parse(localStorage.getItem('chatProfile')),
    socket:io('http://localhost:9000',),
    callingUser:false,
    incomming_call:false
    
}

export const AuthReducer=(state=initialState,action)=>{
    switch(action.type){
        case AUTH:{
                localStorage.setItem('chatProfile',JSON.stringify(action.payload))
                return {...state,user:action.payload}
        }
        case UPDATE_PROFILE:{
            let profile=JSON.parse( localStorage.getItem('chatProfile'))
            profile[action.payload.type]=action.payload.data
            
            localStorage.setItem('chatProfile',JSON.stringify(profile))
            console.log(state.user.name);
            return{...state,user:{...state.user,[action.payload.type]:action.payload.data}}
        }
        case FETCH_ROOM:{
            return{...state,room:action.payload}
        }
        case SOCKET_IO_CONNECTION:{
            return {...state,socket:action.payload}
        }
        case CALLING_USER:{
            console.log(state.callingUser);
            return{...state,callingUser:!state.callingUser}
        }
        case INCOMMING_CALL:{
            return{...state,incomming_call:!state.incomming_call,call:action.payload}
        }
        case ALL_USERS:{
            return{...state,allUsers:action.payload}
        }
        case  ADD_TO_CONTACTS:{
            return{...state,allUsers:state.allUsers.filter((user)=>user._id!=action.payload._id)}
        }
        case SET_LOADING:{
            return{
                ...state,loading:action.payload
            }
        }
        case LOGOUT:{
            localStorage.removeItem('chatProfile')
           return initialState
        }

        default :return state
    }
}