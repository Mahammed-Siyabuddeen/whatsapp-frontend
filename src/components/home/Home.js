import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar/SideBar'
import Chat from '../Chat/Chat'
import { INCOMMING_CALL } from '../../redux/constants/actionType'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import {useStyles} from './styles'
function Home({ user, friendVideo, myVideo }) {
  const { socket } = useSelector((state) => state.AuthReducer)
  const[open,setOpen]=useState(false)
  const[from,setFrom]=useState(null)
  const[signal,setSignal]=useState(null)
  const[userName,setUserName]=useState(null)
  
  const classes=useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleClickToOpen=()=>{
        setOpen(true)
  }
  
  const handleAnswer=(e)=>{
    e.preventDefault()
      dispatch({ type: INCOMMING_CALL, payload: { from, signal } })
      setOpen(false)
      navigate('/videochat')
    
  }

  const handleDecline=()=>{
    setOpen(false)
    socket.emit('hangUp',{friendId:from})
  }


  useEffect(() => {
    socket.on('callUser', async ({ from,userName, signal }) => {
      console.log('from:', signal);
      setFrom(from);setSignal(signal);setUserName(userName)
      handleClickToOpen()
    })

    return () => {
      socket.off('callUser')
    }
  }, [])



  return (
    <div className="App">
      <div className="App_body">
        <>
          <SideBar user={user} />
          <Chat friendVideo={friendVideo} myVideo={myVideo} />
          <Dialog open={open} onClose={handleDecline} >
              <DialogTitle>calling...</DialogTitle>  
              <DialogContent>
                    <DialogContentText>{userName}</DialogContentText>
              </DialogContent>       <DialogActions>
                    <Button variant='contained' className={classes.ButtonDecline} onClick={handleDecline}  >dicline</Button>
                    <Button variant='contained' color='primary' onClick={handleAnswer}>Answer</Button>
              </DialogActions>
          </Dialog>
        </>
      </div>
    </div>
  )
}

export default Home