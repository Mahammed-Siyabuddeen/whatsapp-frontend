import { Button } from '@mui/material'
import { CallEnd } from '@mui/icons-material'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Peer from 'simple-peer'
import { useStyles } from './styles'
import {useNavigate} from 'react-router-dom'

function AudioChat() {
    const myAudio=useRef()
    const friendAudio=useRef()
    const connectionRef=useRef()
    const[stream,setStream]=useState()
    const classes=useStyles()
    const navigate=useNavigate()

    const {AuthReducer,RoomReducer}=useSelector((state)=>state)
    const {callingUser,socket,user,call}=AuthReducer
    const {currentRoom}=RoomReducer

    useEffect(()=>{
        navigator.mediaDevices.getUserMedia({audio:true}).then((myStream)=>{
            setStream(myStream)
            myAudio.current.srcObject=myStream;
            if(callingUser) callUser(myStream)
            else AnswerCall(myStream)

        })
    },[])

    useEffect(()=>{
        socket.on('hangUp',()=>{
           try {
            stream.getTracks()?.forEach(function (track) {
                track.stop();
                connectionRef.current=null
                navigate('/')
            });
           } catch (error) {
              window.location.href='/' 
           }
            
        })

        return ()=>{
            socket.off('hangUp')
        }
    },[])

    const callUser=(myStream)=>{
        const peer=new Peer({initiator:true,trickle:false,stream:myStream})

        peer.on('signal',(data)=>{
            socket.emit('audioCall',{userId:user._id,userName:user?.name,friendId:currentRoom._id,signalData:data})

        })
        peer.on('stream',(currentStream)=>{
            console.log('call-usr-steam',currentStream);
            friendAudio.current.srcObject=currentStream;

        })
        socket.on('answerCall',({signal})=>{
            console.log('Ansercall :',signal);
            peer.signal(signal)
        })
        connectionRef.current=peer
    }

    const AnswerCall=(stream)=>{

        const peer=new Peer({initiator:false,trickle:false,stream})
        
        peer.on('signal',(data)=>{
            socket.emit('answerCall',{signal:data,to:call.from})

        })
        peer.on('stream',(currentStream)=>{
            console.log('answer-stream',currentStream);
            friendAudio.current.srcObject=currentStream;

        })
        peer.signal(call.signal)
        connectionRef.current = peer
        
    }
    const hangUp=()=>{
        socket.emit('hangUp', { friendId: currentRoom?._id || call?.from, })
        //  window.location.reload('/')
        stream.getTracks()?.forEach(function (track) {
            track.stop();
            navigate('/')
        });
    }
    console.log('stream : ',stream?.active);
  return (
      <div className={classes.App}>
          <div className={classes.App_body}>
              <div  className={classes.Audiocall_container}>
                 <audio ref={friendAudio} autoPlay/>
                 <audio ref={myAudio} muted />
                 <Button className={classes.icon_button} onClick={hangUp}>
                     <CallEnd  className={classes.icon} sx={{ fontSize: 40 }} />
                  </Button>
              </div>
          </div>
      </div>
      
  )
}

export default AudioChat