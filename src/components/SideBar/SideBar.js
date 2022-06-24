import React, { useEffect, useState } from 'react'
import './SideBar.css'
import Avatar from '@material-ui/core/Avatar'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import { Button, IconButton,} from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import MoreViewIcon from '@material-ui/icons/MoreVert'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import SidebarChat from '../SidebarChat/SidebarChat'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fectRooms } from '../../redux/actions/Rooms'
import { FETCH_ROOM } from '../../redux/constants/actionType'
function SideBar() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {AuthReducer,RoomReducer}=useSelector((state)=>state)
  const[search,setSearch]=useState('')

  const{user}=AuthReducer
  var{rooms}=RoomReducer
  useEffect(()=>{
    console.log(user);
    if(user && !search  )
    dispatch(fectRooms(user._id))
  },[search])

  const handleSearch=(e)=>{
    e.preventDefault()
    console.log(e.target.value);
    setSearch(e.target.value)
    var ans=rooms.filter((data)=>{ data={name:data.name,phoneNumber:data.phoneNumber}; console.log(data);     return Object.values(data).some((values)=>{  return values.includes(e.target.value)})})
    console.log('ans :',ans);
    dispatch({type:FETCH_ROOM,payload:ans})
    console.log('rooms',rooms);

  }
  
  return (
    <div className='SideBar'>
        <div className='sidebar_header'>
          <Button onClick={()=>navigate('/profile')} >
            <Avatar src={user.avatar ||''} />
          </Button>
           <div className='sidebar_headerRight'>
              <IconButton>
                 <DonutLargeIcon/>
              </IconButton>
              <IconButton onClick={()=>navigate('/users')}>
                 <ChatIcon/>
              </IconButton>
           </div>
        </div>

        <div className='sidebar_search'>
          <div className='sidebar_searchContainer'>
            <SearchOutlined/>
            <input placeholder='start new chat' value={search} onChange={handleSearch}  type='text'/>
          </div>
        </div>
         
         <div className="sidebar_chats">
           {
             rooms.map((data,i)=>(

               <SidebarChat key={i} data={data}/>
             ))
           }
         </div>
      
    </div>
  )
}

export default SideBar