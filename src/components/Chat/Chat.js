import React, { useEffect, useState } from 'react'
import './Chat.css'
import { useDispatch, useSelector } from 'react-redux'
import { syncMessage } from '../../redux/actions/Messages'
import { REMOVE_CURRENT_CHAT, SET_CURRENT_CHAT } from '../../redux/constants/actionType'
import ChatBody from './ChatBody'
import ChatHeader from './ChatHeader'
import ChatFooter from './ChatFooter'
import ImageView from '../FileView/ImageView'
import VideoView from '../FileView/VideoView'

function Chat({ friendVideo, myVideo }) {

  const [input, setInput] = useState('')
  const[currentImage,setCurrentImage]=useState('')
  const[currentVideoDetails,setCurrentVideoDetails]=useState({})
  const[popup,setPopup]=useState(false)
  const[videoPopup,setVideoPopup]=useState(false)
  const[videoId,setVideoId]=useState()
  const { RoomReducer, AuthReducer } = useSelector((state) => state)
  const { currentRoom} = RoomReducer
  const { socket, user } = AuthReducer
  const dispatch = useDispatch()

  

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


  // functions
  const sendMessage = async (e) => {
    e.preventDefault()
    console.log('input', input);
    socket.emit('sendMessage', { data: { message: input, author: user._id, to: currentRoom._id }, receiverId: currentRoom._id })
    var timeStamp = new Date().toISOString()
    const TEN_DIGIT=10000000000
    const randomNUmber=Math.floor(Math.random()*TEN_DIGIT).toString()
    dispatch({ type: SET_CURRENT_CHAT, payload: { message: input, author: user._id, timeStamp ,_id:randomNUmber} })
    setInput('')


  }
 
  const handleViewImage=(imageFile)=>{
      setPopup(true)
      setCurrentImage(imageFile)
  }

  const handleViewVideo=({videoFile,_id})=>{
    setVideoPopup(true)
    setCurrentVideoDetails({videoFile,_id})

  }
  
console.log(popup)
  return (
    <div className='Chat'>
      {
        currentRoom && (
          <ChatHeader   friendVideo={friendVideo} myVideo={myVideo} />
        )
      }
      <ChatBody user={user}  handleViewImage={handleViewImage} handleViewVideo={handleViewVideo} />
      <ChatFooter   input={input} setInput={setInput} sendMessage={sendMessage}      />
      <ImageView popup={popup} setPopup={setPopup} currentImage={currentImage}/>
      <VideoView videoPopup={videoPopup} setVideoPopup={setVideoPopup} currentVideoDetails={currentVideoDetails} />
    </div >
  )
}

export default Chat