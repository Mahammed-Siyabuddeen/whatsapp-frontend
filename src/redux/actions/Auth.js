import * as api from "../../api/index"
import { AUTH } from "../constants/actionType";

export const LoginUser=(formData,router)=>async(dispatch)=>{
     const{password,phoneNumber}=formData
    try {
        console.log(formData);
        const {data}=await api.signIn({password,phoneNumber})
        console.log(data)
        dispatch({type:AUTH,payload:data})
        router('/')
    } catch (error) {
        console.log(error);
        return error.message
    }

}

export const signUpUser=(formData,router)=>async(dispatch)=>{
            try {
                
                const {data}=await api.signUp(formData);
                dispatch({type:AUTH,payload:data})
                router('/')
            } catch (error) {
                console.log(error);
                return error.message
            }

}

export const socketioConnect=()=>{
    
}