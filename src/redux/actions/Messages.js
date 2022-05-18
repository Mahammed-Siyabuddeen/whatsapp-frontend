import * as api from '../../api/index'
import { CURRENT_CHAT } from '../constants/actionType';

export const newMessaage=()=>{
    

}
export const syncMessage=({userId,friendId})=>async(dispatch)=>{
    try {
        const {data}=await api.syncMessage({userId,friendId})
        console.log(data);
        dispatch({type:CURRENT_CHAT,payload:data?.data})
    } catch (error) {
        console.log(error.message);
    }
    
}
