import React, { useEffect } from 'react'
import './SideBar.css'
import Avatar from '@material-ui/core/Avatar'
import DonutLargeIcon from '@material-ui/icons/DonutLarge'
import { IconButton,} from '@material-ui/core'
import ChatIcon from '@material-ui/icons/Chat'
import MoreViewIcon from '@material-ui/icons/MoreVert'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import SidebarChat from '../SidebarChat/SidebarChat'
import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fectRooms } from '../../redux/actions/Rooms'
function SideBar() {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const {AuthReducer,RoomReducer}=useSelector((state)=>state)
  const{user}=AuthReducer
  const{rooms}=RoomReducer
  useEffect(()=>{
    console.log(user);
    if(user)
    dispatch(fectRooms(user._id))
  },[])
  return (
    <div className='SideBar'>
        <div className='sidebar_header'>
        <Avatar   src="https://media-exp1.licdn.com/dms/image/C5603AQGtoenXjHWZ7w/profile-displayphoto-shrink_200_200/0/1652077013142?e=1657756800&v=beta&t=lvfoy9mg2J4NSoBfUsTX0EIDnevAnAkTKcPGdhdzfSA"/>
           <div className='sidebar_headerRight'>
              <IconButton>
                 <DonutLargeIcon/>
              </IconButton>
              <IconButton onClick={()=>navigate('/users')}>
                 <ChatIcon/>
              </IconButton>
              <IconButton>
                 <MoreViewIcon/>
              </IconButton>
           </div>
        </div>

        <div className='sidebar_search'>
          <div className='sidebar_searchContainer'>
            <SearchOutlined/>
            <input placeholder='start new chat' type='text'/>
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