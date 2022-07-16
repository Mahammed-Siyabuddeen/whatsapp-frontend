import { InsertEmoticon, Mic, InsertPhoto } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AudioReactRecorder, { RecordState } from 'audio-react-recorder'
import { IconButton } from '@material-ui/core'
import { SET_CURRENT_CHAT } from '../../redux/constants/actionType'

function ChatFooter({input,setInput,sendMessage}) {

    const {AuthReducer,RoomReducer}=useSelector(state=>state)
    const {user,socket}=AuthReducer
    const {currentRoom}=RoomReducer
    const[file,setFile]=useState()
    const [play, setPlay] = useState(false)
    const [recordState, setRecordState] = useState(null)
    const dispatch=useDispatch()


    useEffect(()=>{
      if(file ){
         const reader=new FileReader()
         reader.readAsDataURL(file)
         reader.onloadend=()=>{
           console.log(reader.result);
           sendFile(reader.result)
         }
         setFile('')
       }
     },[file])

     const sendFile=(file)=>{
      socket.emit('sendMessage', { data: { imageFile:file, author: user._id, to: currentRoom._id }, receiverId: currentRoom._id })
      var timeStamp = new Date().toISOString()
      dispatch({ type: SET_CURRENT_CHAT, payload: { imageFile:file, author: user._id, timeStamp } })  
    }
    
    const sendImoji = (e) => {
      e.preventDefault();
      socket.emit('sendMessage', { data: { message: '😊', author: user._id, to: currentRoom._id }, receiverId: currentRoom._id })
      var timeStamp = new Date().toISOString()
      dispatch({ type: SET_CURRENT_CHAT, payload: { message: '😊', author: user._id, timeStamp } })
    }


    // voicemessage functions //
    const sendVioceMessage = (audioFile) => {
      socket.emit('sendMessage', { data: { audioFile, author: user._id, to: currentRoom._id }, receiverId: currentRoom._id })
      var timeStamp = new Date().toISOString()
      dispatch({ type: SET_CURRENT_CHAT, payload: { audioFile, author: user._id, timeStamp } })
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

    // ended voice message functions //
  return (
    <div className="chat_footer">
      <IconButton>
        <InsertEmoticon disabled={!currentRoom} onClick={sendImoji} />
      </IconButton>
    <IconButton component='label'>
       <InsertPhoto/>
       <input type='file' accept='image/*' disabled={!currentRoom}  hidden onChange={(e)=>setFile(e.target.files[0])}/>
    </IconButton>
    
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
     <IconButton>
       <Mic disabled={!currentRoom} onClick={handleStart} />
     </IconButton>

  </div>
  )
}

export default ChatFooter