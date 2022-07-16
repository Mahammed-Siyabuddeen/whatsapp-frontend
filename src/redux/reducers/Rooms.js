import { CURRENT_CHAT, CURRENT_CHAT_ROOM, FETCH_ROOM, FETCH_VIDEO_FILE, REMOVE_CURRENT_CHAT, REMOVE_CURRENT_VIDEOFILE, SET_CURRENT_CHAT, SET_NOTIFICATIONS, UPDATE_STATUS } from "../constants/actionType"

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
       case FETCH_VIDEO_FILE:{
           return{...state,currentVideo:action.payload}
       }
       case REMOVE_CURRENT_VIDEOFILE:{
           return{...state,currentVideo:undefined}
       }
       case UPDATE_STATUS:{
           return{...state,
            rooms:state.rooms.map((data)=>{
                 if(data._id===action.payload._id)
                     data.status=action.payload.status
              return data
            }),
            currentRoom:state.currentRoom?{...state.currentRoom,status:action.payload.status}:undefined
        }
       }
       case SET_NOTIFICATIONS:{
           return{...state,
            rooms:state.rooms.map((data)=>{
                if(data._id===action.payload.friendId)
                    data.smsStatus=action.payload.smsStatus;
                return data;
            })}
       }
       default:return state
    }
}
