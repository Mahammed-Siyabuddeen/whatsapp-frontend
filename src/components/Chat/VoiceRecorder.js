import { Mic } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_CURRENT_CHAT } from '../../redux/constants/actionType'
import './Chat.css'

const VioceRecorder = ({ isRecording, setIsRecording }) => {
  const { AuthReducer, RoomReducer } = useSelector(state => state)
  const dispatch = useDispatch()
  const { currentRoom } = RoomReducer
  const { user, socket } = AuthReducer
  const [audioURL, setAudioURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const sendVioceMessage = (audioFile) => {
    socket.emit('sendMessage', { data: { audioFile, author: user._id, to: currentRoom._id }, receiverId: currentRoom._id })
    var timeStamp = new Date().toISOString()
    dispatch({ type: SET_CURRENT_CHAT, payload: { audioFile, author: user._id, timeStamp } })
  }

  useEffect(() => {
    if (!isRecording) return;
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (e) => {
          chunksRef.current.push(e.data);
        };
        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(chunksRef.current, { type: 'audio/ogg; codecs=opus' });
          chunksRef.current = [];
          var reader = new FileReader()
          reader.readAsDataURL(blob)
          reader.onloadend = () => {
            var base64data = reader.result
            sendVioceMessage(base64data)
          }
        };
        mediaRecorderRef.current.start();
      })
      .catch(() => console.log('Error accessing microphone'));
  }, [isRecording]);

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorderRef.current.stop();
    mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    chunksRef.current = []

  };

  return (
    <div className='voiceRecording_div'>
      <p >Recording...</p>
      <IconButton disabled={!currentRoom}>
        <Mic disabled={!currentRoom} onClick={stopRecording} />
      </IconButton>
    </div>
  )
}

export default VioceRecorder