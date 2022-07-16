import React from 'react'
import { Avatar } from '@material-ui/core'
import {Notifications} from '@material-ui/icons'
import './sidebarChat.css'
import { useDispatch } from 'react-redux'
import { CURRENT_CHAT_ROOM } from '../../redux/constants/actionType'
import { readNotification } from '../../redux/actions/Rooms'
function SidebarChat({ data,myId }) {
    const {name,status,avatar,smsStatus,_id}=data
  const dispatch = useDispatch()
  
  const handleClick = (e) => {
    e.preventDefault()
    dispatch({ type: CURRENT_CHAT_ROOM, payload: data })
    dispatch(readNotification({myId,friendId:_id,smsStatus:'readed'}))
  }
  return (
    <div className='sidebarChat' onClick={handleClick}>
      <Avatar src={avatar||''} />
      <div className="sidebarChat_info">
        <h2>{name}</h2>
        <p style={{fontSize:'10px'}}>{status||''}</p>
      </div>
      {
       smsStatus=='unread'&&(
      <div style={{marginLeft:'auto',color:'red'}}>
        <Notifications/>
      </div>
       )
      }
    </div>
  )
}

export default SidebarChat