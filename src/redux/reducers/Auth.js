import { AUTH, CALLING_USER, FETCH_ROOM, INCOMMING_CALL, SOCKET_IO_CONNECTION } from "../constants/actionType";
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
        default :return state
    }
}