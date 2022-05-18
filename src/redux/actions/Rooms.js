import { FETCH_ROOM } from "../constants/actionType"
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