import { FETCH_ROOM, FETCH_VIDEO_FILE, SET_NOTIFICATIONS } from "../constants/actionType"
import * as api from '../../api/index'


export const fectRooms=(_id)=>async(dispatch)=>{
    console.log(_id);
    try {
        const {data}=await api.fectRooms({_id})

        dispatch({type:FETCH_ROOM,payload:data?.list})
        
    } catch (error) {
        console.log(error);
        
    }
}
export const fecthVideoFile=(_id)=>async(dispatch)=>{
    try {
        const {data}=await api.fecthVideoFile(_id)
        console.log('videofected : ',data);
        dispatch({type:FETCH_VIDEO_FILE,payload:data})
    } catch (error) {
        console.log(error);
    }
}
export const roomNotification=({friendId,_id,smsStatus})=>async(dispatch)=>{
    
    dispatch({type:SET_NOTIFICATIONS,payload:{friendId:_id,smsStatus}})
    await api.roomNotification({friendId,_id,smsStatus})
}
export const readNotification=({friendId,myId,smsStatus})=>async(dispatch)=>{
    console.log('readNotification')
    dispatch({type:SET_NOTIFICATIONS,payload:{friendId,smsStatus}})
    //here exchanging users id for perticular api 
    await api.roomNotification({_id:friendId,friendId:myId,smsStatus})

}