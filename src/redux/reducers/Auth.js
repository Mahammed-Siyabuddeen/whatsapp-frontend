import { AUTH, FETCH_ROOM, SOCKET_IO_CONNECTION } from "../constants/actionType";
import io from 'socket.io-client'
const user=JSON.parse(localStorage.getItem('chatProfile'))
const phoneNumber=user?.phoneNumber
const initialState={
    user:JSON.parse(localStorage.getItem('chatProfile')),
    socket:io('http://localhost:9000',)
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

        default :return state
    }
}