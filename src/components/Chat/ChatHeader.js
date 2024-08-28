import { Avatar, IconButton, TextField } from '@mui/material'
import { AttachFile, SearchOutlined } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { SET_CURRENT_CHAT } from '../../redux/constants/actionType'
import MenuIcon from './menu'
import './Chat.css'

function ChatHeader({ friendVideo, myVideo }) {
  const { AuthReducer, RoomReducer } = useSelector(state => state)
  const { currentRoom, currentChat } = RoomReducer
  const { socket, user } = AuthReducer
  const [file, setFile] = useState()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (file) {
      if (file.size > 30000000) return alert('file length not more than 30mb')
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        console.log(reader.result);
        setFile('')
        sendFile(reader.result)
      }
    }
  }, [file])

  const sendFile = async (file) => {
    var timeStamp = new Date().toISOString()
    dispatch({ type: SET_CURRENT_CHAT, payload: { videoFile: file, author: user._id, timeStamp } })
    console.log(file);
    await socket.emit('sendMessage', { data: { videoFile: file, author: user._id, to: currentRoom._id }, receiverId: currentRoom._id })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (e.target.value === '') return 0;
    const result = currentChat.filter((data) => { data = { message: data.message }; return Object.values(data).some((value) => value?.includes(e.target.value)) })
    if (result.length) document.getElementById(result[0]._id).scrollIntoView()
  }

  return (
    <div className="chat_header">
      <Avatar src={currentRoom?.avatar} onClick={() => navigate('/contactInfo')} />
      <div onClick={() => navigate('/contactInfo')} className="chat_headerInfo">
        <h3>{currentRoom?.name}</h3>
        <p>{currentRoom?.status || ''}</p>
      </div>

      <div className="chat_headerRight">
        {(<TextField  sx={{ height: '35px', '& .MuiInputBase-root': { height: '100%' } }} className='chat_search_box'  onChange={handleSearch} />)}
        <IconButton>
          <SearchOutlined />
        </IconButton>
        <IconButton component='label'>
          <AttachFile />
          <input type='file' hidden onChange={e => setFile(e.target.files[0])} accept='video/*' />
        </IconButton>
        <IconButton>
          <MenuIcon userId={user?._id} friendId={currentRoom?._id} friendVideo={friendVideo} myVideo={myVideo} />
        </IconButton>
      </div>
    </div>
  )
}

export default ChatHeader