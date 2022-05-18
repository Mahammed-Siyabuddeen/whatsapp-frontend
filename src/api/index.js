import axios from 'axios'

const API=axios.create({
    baseURL:'http://localhost:9000'
})


export const signIn=(formData)=>API.post('/auth/login',formData)
export const signUp=(formData)=>API.post('/auth/signup',formData)
export const message=({message})=>API.post('/messages/new',message)
export const fectRooms=({_id})=>API.post('/auth/fetch',{_id})
export const syncMessage=({userId,friendId})=>API.post('/messages/sync',{userId,friendId})