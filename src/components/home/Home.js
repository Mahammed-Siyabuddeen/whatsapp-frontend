import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar/SideBar'
import Chat from '../Chat/Chat'
import { INCOMMING_CALL } from '../../redux/constants/actionType'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import {useStyles} from './styles'
import ringtune from '../../static/69XYNCF-online-phone-ringing.mp3'
function Home({ user, friendVideo, myVideo }) {
  const { socket } = useSelector((state) => state.AuthReducer)
  const[open,setOpen]=useState(false)
  const[from,setFrom]=useState(null)
  const[signal,setSignal]=useState(null)
  const[userName,setUserName]=useState(null)
  const[videoDialog,setVideoDialog]=useState(false)

  
  const classes=useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()


 
  
  const handleVideoAnswer=(e)=>{
    e.preventDefault()
      dispatch({ type: INCOMMING_CALL, payload: { from, signal } })
      setOpen(false)
      navigate('/videochat')
    
  }
  const handleAudioAnswer=(e)=>{
    e.preventDefault()
    dispatch({type: INCOMMING_CALL, payload: { from, signal } })
    setOpen(false)
    navigate('/audiochat')
  }

  const handleDecline=()=>{
    setOpen(false)
    socket.emit('hangUp',{friendId:from})
  }


  useEffect(() => {
    socket.on('callUser', async ({ from,userName, signal }) => {
      console.log('from:', signal);
      setFrom(from);setSignal(signal);setUserName(userName)
      setVideoDialog(true)
      setOpen(true)
    })

    return () => {
      socket.off('callUser')
    }
  }, [])


  useEffect(()=>{
    socket.on('audioCall',({from,userName,signal})=>{
    console.log('from : ',signal);
    setFrom(from);setSignal(signal);setUserName(userName)
    setOpen(true)
    })

    return()=>{
      socket.off('audioCall')
    }
  },[])

   useEffect(()=>{

    socket.on('hangUp',()=>{
      setOpen(false)
    })
    return()=>{
      socket.off('hangUp')
    }
   },[])


   
  return (
    <div className="App">
      <div className="App_body">
        <>
          <SideBar user={user} />
          <Chat friendVideo={friendVideo} myVideo={myVideo} />
          {open&&(
                    <audio src={ringtune} autoPlay loop>

                    </audio>
                    )}
          {videoDialog?(
              <Dialog open={open} onClose={handleDecline} >
                  <DialogTitle>Video calling...</DialogTitle>  
                  <DialogContent>
                        <DialogContentText>{userName}</DialogContentText>
                  </DialogContent>       <DialogActions>
                        <Button variant='contained' className={classes.ButtonDecline} onClick={handleDecline}  >dicline</Button>
                        <Button variant='contained' color='primary' onClick={handleVideoAnswer}>Answer</Button>
                  </DialogActions>
              </Dialog>
          ):(
                <Dialog open={open} onClose={handleDecline} >
                    <DialogTitle>Audio-calling...</DialogTitle>  
                    <DialogContent>
                          <DialogContentText>{userName}</DialogContentText>
                    </DialogContent>    
                     <DialogActions>
                          <Button variant='contained' className={classes.ButtonDecline} onClick={handleDecline}  >dicline</Button>
                          <Button variant='contained' color='primary' onClick={handleAudioAnswer}>Answer</Button>
                    </DialogActions>
                 
                </Dialog>

          )
          }

        </>
      </div>
    </div>
  )
}

export default Home