import { InsertEmoticon, Mic, InsertPhoto } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IconButton } from '@mui/material'
import { SET_CURRENT_CHAT } from '../../redux/constants/actionType'
import VioceRecorder from './VoiceRecorder'

function ChatFooter({ input, setInput, sendMessage }) {

  const { AuthReducer, RoomReducer } = useSelector(state => state)
  const { user, socket } = AuthReducer
  const { currentRoom } = RoomReducer
  const [file, setFile] = useState()
  const [isRecording, setIsRecording] = useState(false);
  const [recordState, setRecordState] = useState(null)
  const dispatch = useDispatch()


  useEffect(() => {
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        console.log(reader.result);
        sendFile(reader.result)
      }
      setFile('')
    }
  }, [file])

  const sendFile = (file) => {
    socket.emit('sendMessage', { data: { imageFile: file, author: user._id, to: currentRoom._id }, receiverId: currentRoom._id })
    var timeStamp = new Date().toISOString()
    dispatch({ type: SET_CURRENT_CHAT, payload: { imageFile: file, author: user._id, timeStamp } })
  }

  const sendImoji = (e) => {
    e.preventDefault();
    socket.emit('sendMessage', { data: { message: '😊', author: user._id, to: currentRoom._id }, receiverId: currentRoom._id })
    var timeStamp = new Date().toISOString()
    dispatch({ type: SET_CURRENT_CHAT, payload: { message: '😊', author: user._id, timeStamp } })
  }


  return (
    <div className="chat_footer">
      <IconButton>
        <InsertEmoticon disabled={!currentRoom} onClick={sendImoji} />
      </IconButton>
      <IconButton component='label'>
        <InsertPhoto />
        <input type='file' accept='image/*' disabled={!currentRoom} hidden onChange={(e) => setFile(e.target.files[0])} />
      </IconButton>

      {isRecording ?
        <VioceRecorder isRecording={isRecording} setIsRecording={setIsRecording} />
        : <>
          <form>
            <input
              disabled={!currentRoom}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='type a message'
              type='text'
            />
            <button onClick={sendMessage}
              type='submit'
            >
              Send a message
            </button>
          </form>
          <IconButton disabled={!currentRoom}>
            <Mic onClick={() => setIsRecording(true)} />
          </IconButton>
        </>
      }
    </div>
  )
}

export default ChatFooter