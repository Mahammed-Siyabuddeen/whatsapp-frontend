import axios from 'axios'

const API=axios.create({
    baseURL:'https://whatsapp-clone-shihab.herokuapp.com'
})
API.interceptors.request.use((req)=>{
    if(localStorage.getItem('chatProfile')){
        try {
            req.headers.Authorization=`Bearer ${JSON.parse(localStorage.getItem('chatProfile')).token}`
        } catch (error) {
            console.log(error)
            alert(error.message)
        }
    }
    return req;
})


export const signIn=(formData)=>API.post('/auth/login',formData)
export const signUp=(formData)=>API.post('/auth/signup',formData)
export const message=({message})=>API.post('/messages/new',message)
export const fectRooms=({_id})=>API.post('/auth/fetch',{_id})
export const syncMessage=({userId,friendId})=>API.post('/messages/sync',{userId,friendId})
export const allUsers=(_id)=>API.post('/allusers',{_id})
export const addTocontacts=({_id,userId})=>API.post('/addcontacts',{_id,userId})
export const updateProfile=({_id,type,data})=>API.post('/auth/updateprofile',{_id,type,data})
export const fecthVideoFile=(_id)=>API.get(`/messages/videofile/${_id}`)
export const roomNotification=({friendId,_id,smsStatus})=>API.post('auth/notification',{friendId,_id,smsStatus})