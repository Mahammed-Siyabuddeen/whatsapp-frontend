import React, { useEffect, useRef, useState } from 'react'
import './Chat.css'
import Avatar from '@material-ui/core/Avatar'
import { IconButton, createTheme,ThemeProvider, makeStyles, Button, Dialog } from '@material-ui/core'
import { SearchOutlined, AttachFile, InsertEmoticon, Mic } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { syncMessage } from '../../redux/actions/Messages'
import { REMOVE_CURRENT_CHAT, SET_CURRENT_CHAT } from '../../redux/constants/actionType'
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import AudioPlayer from 'material-ui-audio-player'
import MenuIcon from './menu'
import { useStyle } from './styles'
import ImageView from '../ImageView/ImageView'
import { useNavigate } from 'react-router-dom'

function Chat({ friendVideo, myVideo }) {

  const [input, setInput] = useState('')
  const[file,setFile]=useState('')
  const[currentImage,setCurrentImage]=useState('')
  const[popup,setPopup]=useState(false)
  const [recordState, setRecordState] = useState(null)
  const { RoomReducer, AuthReducer } = useSelector((state) => state)
  const [play, setPlay] = useState(false)


  const { currentRoom, currentChat } = RoomReducer
  const { socket, user } = AuthReducer
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const ref = useRef()
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

    return()=>{
      dispatch({type:REMOVE_CURRENT_CHAT})
    }

  }, [currentRoom])


  useEffect(() => {

    socket.on('newMessage', ({ message, audioFile,imageFile ,author }) => {
      console.log("imagefile : ", imageFile);
      console.log("roomReducer : ", RoomReducer.currentRoom._id);
      var timeStamp = new Date().toISOString()
      console.log('author', author, "  RommRed", RoomReducer.currentRoom._id);
      if (author === RoomReducer.currentRoom._id) {
        dispatch({ type: SET_CURRENT_CHAT, payload: { message,imageFile, audioFile, author, timeStamp } })
      }
    })
    return () => {
      socket.off('newMessage')
    }
  }, [RoomReducer])


  useEffect(()=>{
    if(file ){
       const reader=new FileReader()
       reader.readAsDataURL(file)
       reader.onloadend=()=>{
         console.log(reader.result);
         sendFile(reader.result)
       }
       setFile('')
       // socket.emit('sendMessage')
     }
   },[file])

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

  const sendFile=(file)=>{
    socket.emit('sendMessage', { data: { imageFile:file, author: user._id, to: currentRoom._id }, receiverId: currentRoom._id })
    var timeStamp = new Date().toISOString()
    dispatch({ type: SET_CURRENT_CHAT, payload: { imageFile:file, author: user._id, timeStamp } })  
  }
  

  console.log(file);

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
  const handleViewImage=(imageFile)=>{
      setPopup(true)
      setCurrentImage(imageFile)
  }

  return (
    <div className='Chat'>
      {
        currentRoom && (
          <div className="chat_header">
            <Avatar src={currentRoom?.avatar} onClick={()=>navigate('/contactInfo')} />
            <div onClick={()=>navigate('/contactInfo')}  className="chat_headerInfo">
              <h3>{currentRoom?.name}</h3>
              <p>last seen at...</p>
            </div>

            <div className="chat_headerRight">
              <IconButton>
                <SearchOutlined />
              </IconButton>
              <IconButton component='label'>
                  <AttachFile/>
                  <input type='file'  hidden  onChange={e=>setFile(e.target.files[0])}/>
              </IconButton>
              <IconButton>
                <MenuIcon userId={user._id} friendId={currentRoom?._id} friendVideo={friendVideo} myVideo={myVideo} />
              </IconButton>
            </div>
          </div>

        )
      }


      <div className="chat_body">
        {currentChat.map(({ name, message, timeStamp, audioFile,imageFile, author }, i) =>
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
              <ThemeProvider  >
                <AudioPlayer src={audioFile}
                  spacing={3}
                  useStyles={author===user._id? useStyle:uset}
                  volume={false}
                  time={'single'}
                />
              </ThemeProvider>
            </div>
          ):imageFile?(
            <div key={i} className={`chat_message ${author===user._id && 'chat_reciever'}`}>
              <img  width={'200px'} src={imageFile}  onClick={()=>handleViewImage(imageFile)}/>
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

         <ImageView popup={popup} setPopup={setPopup} currentImage={currentImage}/>
      </div>
    </div >
  )
}

export default Chat