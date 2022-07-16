import * as api from "../../api/index"
import { ADD_TO_CONTACTS, ALL_USERS, AUTH, SET_LOADING, UPDATE_PROFILE } from "../constants/actionType";

export const LoginUser=(formData,router,socket)=>async(dispatch)=>{
     const{password,phoneNumber}=formData
    try {
        console.log(formData);
        const {data}=await api.signIn({password,phoneNumber})
        console.log(data)
        dispatch({type:AUTH,payload:data})
        socket.emit('join',{userId:data._id})
        router('/')
    } catch (error) {
        console.log(error);
        return error?.response?.data?.message
    }

}

export const signUpUser=(formData,router,socket)=>async(dispatch)=>{
            try {
                const {data}=await api.signUp(formData);
                dispatch({type:AUTH,payload:data})
                 socket.emit('join',{userId:data.user._id})
                router('/')
            } catch (error) {
                console.log(error);
                return error?.response?.data?.message
            }

}

export const fecthAllUsers=(_id)=>async(dispatch)=>{
    dispatch({type:SET_LOADING,payload:true})
      const {data}=await api.allUsers(_id);
    dispatch({type:SET_LOADING,payload:false})
      dispatch({type:ALL_USERS,payload:data})
}

export const addToContacts=({name,phoneNumber,_id,userId})=>async(dispatch)=>{
    dispatch({type:ADD_TO_CONTACTS,payload:{name,phoneNumber,_id}})
    await api.addTocontacts({_id,userId});

}
export const updateProfile=({type,data,_id})=>async(dispatch)=>{
      try {
          if(type=='avatar'){
              const reader=new FileReader()
             reader.readAsDataURL(data)
             reader.onloadend=()=>{
                 dispatch({type:UPDATE_PROFILE,payload:{type,data:reader.result}})
                 api.updateProfile({type,data:reader.result,_id})
            }
          }else{
                await api.updateProfile({type,data,_id})
                 dispatch({type:UPDATE_PROFILE,payload:{type,data}})
          }
      } catch (error) {
          alert(error?.response?.data?.message)
      }
     

}