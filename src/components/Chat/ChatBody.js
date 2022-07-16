import { makeStyles, ThemeProvider } from '@material-ui/core'
import AudioPlayer from 'material-ui-audio-player'
import React,{useEffect, useRef, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { roomNotification } from '../../redux/actions/Rooms'
import { SET_CURRENT_CHAT, SET_NOTIFICATIONS } from '../../redux/constants/actionType'
import { useStyle } from './styles'

import sound from  '../../static/Whatsapp Tone - iphone.mp3'
function ChatBody({user,handleViewImage,handleViewVideo}) {
  const [playNotification,setPlayNotification]=useState(false)
  const {RoomReducer,AuthReducer}=useSelector(state=>state)
  const{currentChat,currentRoom}=RoomReducer;
  const{socket}=AuthReducer
  const dispatch=useDispatch()
  const ref = useRef()
  const srcollToBottom = () => {ref.current.scrollIntoView() }
  useEffect(srcollToBottom, [currentChat])
  const uset= makeStyles((theme)=>({
    root:{
      padding:'1',
      width:'auto',
    }
  }))

  useEffect(() => {
    socket.on('newMessage', ({ message, audioFile,imageFile ,author,videoFile }) => {
      console.log('newMessage')
      var timeStamp = new Date().toISOString()
      if (author === currentRoom?._id) {
        const TEN_DIGIT=10000000000
        const randomNUmber=Math.floor(Math.random()*TEN_DIGIT).toString()
        dispatch({ type: SET_CURRENT_CHAT
          , payload: { message,imageFile, audioFile, author, timeStamp,videoFile ,_id:randomNUmber} })
      }else{
        dispatch(roomNotification({_id:author,friendId:user?._id,smsStatus:'unread'}))
        setPlayNotification(true)
      }
    })
    return () => {
      socket.off('newMessage')
    }
  }, [RoomReducer])

  return (
    <div className="chat_body">
        {currentChat.map(({ name, message, timeStamp, audioFile,imageFile, author,videoFile,_id }, i) =>
          message ? (
            <p id={_id} key={i} className={`${message=='😊'?'chat_message_emoji_and_voice ':'chat_message'}
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
          ):(
            <div key={i} className={`chat_message ${author===user._id && 'chat_reciever'} `}  onClick={()=>handleViewVideo({videoFile,_id})}>
              <video width='200px' height='150px' controls>
                <source src={''} />
              </video>
            </div>
          )
        )}
        <div ref={ref}></div>
        {playNotification&&(
          <audio onEnded={()=>setPlayNotification(false)} autoPlay={true} src={sound}>

          </audio>
          )}
      </div>
  )
}

export default ChatBody