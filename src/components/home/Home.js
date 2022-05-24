import React, { useEffect} from 'react'
import SideBar from '../SideBar/SideBar'
import Chat from '../Chat/Chat'
import { INCOMMING_CALL } from '../../redux/constants/actionType'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Home({user,friendVideo,myVideo}) {
  const{socket}=useSelector((state)=>state.AuthReducer)
  
  const dispatch=useDispatch()
  const navigate=useNavigate()

  useEffect(()=>{
    socket.on('callUser',async({from,signal})=>{
      console.log('from:',signal);
      dispatch({type:INCOMMING_CALL,payload:{from,signal}})
          navigate('/videochat')
    })

    return()=>{
      socket.off('callUser')
    }
  },[])
  

  return (
    <div className="App">
    <div className="App_body">
     <>
         <SideBar user={user}/>
         <Chat  friendVideo={friendVideo} myVideo={myVideo} />
     </>
    </div>
 </div>
  )
}

export default Home