import { CURRENT_CHAT, CURRENT_CHAT_ROOM, FETCH_ROOM, REMOVE_CURRENT_CHAT, SET_CURRENT_CHAT } from "../constants/actionType"

const initialState={
    rooms:[],
    currentChat:[],
    
}

export const RoomReducer=(state=initialState,action)=>{

    switch(action.type){
       case FETCH_ROOM :{
           return{...state,rooms:action.payload}
       }
       case CURRENT_CHAT_ROOM:{
           return{...state,currentRoom:action.payload}
       }
       case CURRENT_CHAT:{
           return{...state,currentChat:action.payload}
       }
       case SET_CURRENT_CHAT:{
           return{...state,currentChat:[...state.currentChat,action.payload]}
       }
       case REMOVE_CURRENT_CHAT:{
           return{...state,currentChat:[]}
       }
       default:return state
    }
}
