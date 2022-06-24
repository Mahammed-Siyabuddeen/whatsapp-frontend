import React from 'react'
import { Avatar } from '@material-ui/core'
import './sidebarChat.css'
import { useDispatch } from 'react-redux'
import { CURRENT_CHAT_ROOM } from '../../redux/constants/actionType'
function SidebarChat({ data }) {
  
  const dispatch = useDispatch()
  
  const handleClick = (e) => {
    e.preventDefault()
    dispatch({ type: CURRENT_CHAT_ROOM, payload: data })
  }
  return (
    <div className='sidebarChat' onClick={handleClick}>
      <Avatar src={data.avatar||''} />
      <div className="sidebarChat_info">
        <h2>{data?.name}</h2>
        <p>this is last message</p>
      </div>
    </div>
  )
}

export default SidebarChat