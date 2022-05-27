import React, { useEffect, useRef, useState } from 'react'
import './Chat.css'
import Avatar from '@material-ui/core/Avatar'
import { IconButton } from '@material-ui/core'
import { SearchOutlined, AttachFile, InsertEmoticon, Mic } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { syncMessage } from '../../redux/actions/Messages'
import { SET_CURRENT_CHAT } from '../../redux/constants/actionType'
import MenuIcon from './menu'

function Chat({ friendVideo, myVideo }) {

  const [input, setInput] = useState('')
  const { RoomReducer, AuthReducer } = useSelector((state) => state)


  const { currentRoom, currentChat } = RoomReducer
  const { socket, user } = AuthReducer
  const dispatch = useDispatch()
  const ref = useRef()

  const srcollToBottom = () => {
    ref.current.scrollIntoView()
  }

  useEffect(() => {
    if (currentRoom) {
      console.log('disptach');
      dispatch(syncMessage({ userId: user._id, friendId: currentRoom?._id }))
    }

  }, [currentRoom])

  const sendMessage = async (e) => {
    e.preventDefault()
    console.log('input', input);
    socket.emit('sendMessage', { data: { message: input, author: user._id, to: currentRoom._id }, receiverId: currentRoom._id })

    var timeStamp = new Date().toISOString()
    dispatch({ type: SET_CURRENT_CHAT, payload: { message: input, author: user._id, timeStamp } })
    setInput('')


  }
  const sendImoji=(e)=>{
    e.preventDefault();
    socket.emit('sendMessage',{data:{message:'😊',author:user._id,to:currentRoom._id},receiverId:currentRoom._id})
    var timeStamp = new Date().toISOString()
    dispatch({type:SET_CURRENT_CHAT,payload:{message:'😊',author:user._id,timeStamp}})
  }
  useEffect(() => {

    socket.on('newMessage', ({ message, author }) => {
      console.log(message);
      console.log("roomReducer : ", RoomReducer.currentRoom._id);
      var timeStamp = new Date().toISOString()
      console.log('author', author, "  RommRed", RoomReducer.currentRoom._id);
      if (author === RoomReducer.currentRoom._id) {
        dispatch({ type: SET_CURRENT_CHAT, payload: { message, author, timeStamp } })
      }
    })
    return () => {
      socket.off('newMessage')
    }
  }, [RoomReducer])

  useEffect(srcollToBottom, [currentChat])
  return (
    <div className='Chat'>
      {
        currentRoom && (
          <div className="chat_header">
            <Avatar />
            <div className="chat_headerInfo">
              <h3>{currentRoom?.name}</h3>
              <p>last seen at...</p>
            </div>

            <div className="chat_headerRight">
              <IconButton>
                <SearchOutlined />
              </IconButton>
              <IconButton>
                <AttachFile />
              </IconButton>
              <IconButton>
                <MenuIcon userId={user._id} friendId={currentRoom?._id} friendVideo={friendVideo} myVideo={myVideo} />
              </IconButton>
            </div>
          </div>

        )
      }


      <div className="chat_body">
        {currentChat.map(({ name, message, timeStamp, author }, i) => (

          <p key={i} className={`chat_message ${author === user._id && `chat_reciever`}`} >
            <span className="chat_name">{name}</span>
            {message}
            <span className="chat_timestamp">{timeStamp}</span>
          </p>
        ))}
        <div ref={ref}></div>
      </div>

      <div className="chat_footer">
        <InsertEmoticon onClick={sendImoji} />
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
        <Mic />
      </div>

    </div>
  )
}

export default Chat