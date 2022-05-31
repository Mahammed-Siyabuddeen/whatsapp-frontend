import React, { useEffect, useRef, useState } from 'react'
import './Chat.css'
import Avatar from '@material-ui/core/Avatar'
import { IconButton, createTheme,ThemeProvider, makeStyles } from '@material-ui/core'
import { SearchOutlined, AttachFile, InsertEmoticon, Mic } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { syncMessage } from '../../redux/actions/Messages'
import { SET_CURRENT_CHAT } from '../../redux/constants/actionType'
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import AudioPlayer from 'material-ui-audio-player'
import MenuIcon from './menu'
import { useStyle } from './styles'

function Chat({ friendVideo, myVideo }) {

  const [input, setInput] = useState('')
  const [recordState, setRecordState] = useState(null)
  const { RoomReducer, AuthReducer } = useSelector((state) => state)
  const [play, setPlay] = useState(false)


  const { currentRoom, currentChat } = RoomReducer
  const { socket, user } = AuthReducer
  const dispatch = useDispatch()
  const ref = useRef()
  const muiTheme=createTheme({})
  const srcollToBottom = () => {ref.current.scrollIntoView() }

  const uset= makeStyles((theme)=>({
    root:{
        padding:'1',
        width:'auto',
    }
}))

// useEffect
  useEffect(() => {
    if (currentRoom) {
      console.log('disptach');
      dispatch(syncMessage({ userId: user._id, friendId: currentRoom?._id }))
    }

  }, [currentRoom])


  useEffect(() => {

    socket.on('newMessage', ({ message, audioFile, author }) => {
      console.log("audifile : ", audioFile);
      console.log("roomReducer : ", RoomReducer.currentRoom._id);
      var timeStamp = new Date().toISOString()
      console.log('author', author, "  RommRed", RoomReducer.currentRoom._id);
      if (author === RoomReducer.currentRoom._id) {
        dispatch({ type: SET_CURRENT_CHAT, payload: { message, audioFile, author, timeStamp } })
      }
    })
    return () => {
      socket.off('newMessage')
    }
  }, [RoomReducer])

  useEffect(srcollToBottom, [currentChat])


  // functions

  const sendMessage = async (e) => {
    e.preventDefault()
    console.log('input', input);
    socket.emit('sendMessage', { data: { message: input, author: user._id, to: currentRoom._id }, receiverId: currentRoom._id })

    var timeStamp = new Date().toISOString()
    dispatch({ type: SET_CURRENT_CHAT, payload: { message: input, author: user._id, timeStamp } })
    setInput('')


  }
  const sendVioceMessage = (audioFile) => {
    socket.emit('sendMessage', { data: { audioFile, author: user._id, to: currentRoom._id }, receiverId: currentRoom._id })
    var timeStamp = new Date().toISOString()
    dispatch({ type: SET_CURRENT_CHAT, payload: { audioFile, author: user._id, timeStamp } })
  }

  const sendImoji = (e) => {
    e.preventDefault();
    socket.emit('sendMessage', { data: { message: '😊', author: user._id, to: currentRoom._id }, receiverId: currentRoom._id })
    var timeStamp = new Date().toISOString()
    dispatch({ type: SET_CURRENT_CHAT, payload: { message: '😊', author: user._id, timeStamp } })
  }

  const handleStart = (e) => {
    e.preventDefault()
    console.log('handlestart');
    console.log(play);
    setPlay(prevState=>!prevState)
    if (!play) {
      console.log('play');
      setRecordState(RecordState.START)
    }
    else {
      console.log('notplay');
      setRecordState(RecordState.STOP)
    }
  }

  const onStop = (AudioDate) => {
    console.log('audioData : ', AudioDate.blob);
    var reader = new FileReader()
    reader.readAsDataURL(AudioDate.blob)
    reader.onloadend = () => {
      var base64data = reader.result
      sendVioceMessage(base64data)

      console.log(base64data)
    }
  }

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
        {currentChat.map(({ name, message, timeStamp, audioFile, author }, i) =>
          message ? (
            <p key={i} className={`${message=='😊'?'chat_message_emoji_and_voice ':'chat_message'}
                ${author === user._id && `chat_reciever`}`} >
              <span className="chat_name">{name}</span>
              {message}
              <span className="chat_timestamp">{timeStamp}</span>
            </p>
          ) :
          audioFile ?(
            <div key={i} className={`chat_message_emoji_and_voice ${author === user._id && `chat_reciever`}`}>
              <ThemeProvider theme={muiTheme} >
                <AudioPlayer src={audioFile}
                  spacing={3}
                  useStyles={author===user._id? useStyle:uset}
                  volume={false}
                  time={'single'}
                />
              </ThemeProvider>
            </div>
          ):null
        )}
        <div ref={ref}></div>
      </div>

      <div className="chat_footer">
        <InsertEmoticon disabled={!currentRoom} onClick={sendImoji} />
        {!play  &&
          (
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
              )}
            <div  style={{display:`${play? 'block':'none' }`}}  >
              <AudioReactRecorder  state={recordState} onStop={onStop}  canvasHeight={50} canvasWidth={300}/>
            </div>
      
      <Mic disabled={!currentRoom} onClick={handleStart} />


      </div>

    </div >
  )
}

export default Chat